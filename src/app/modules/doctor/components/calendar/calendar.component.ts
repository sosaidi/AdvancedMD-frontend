import { Component } from '@angular/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { FullCalendarModule } from '@fullcalendar/angular'
import { FormsModule } from '@angular/forms'
import { DatePipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule, FormsModule, DatePipe, NgIf],
  providers: [DatePipe], // Provide DatePipe here
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  calendarOptions: any
  showEventModal: boolean = false
  selectedEvent: any = {}
  showAddEventModal: boolean = false
  newEvent: any = { title: '', start: '', description: '' }
  currentViewTitle: string = 'My Calendar'

  constructor(private datePipe: DatePipe) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      editable: true,
      selectable: true,
      headerToolbar: false,
      dayHeaderFormat: { weekday: 'long' },
      events: [

      ],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
    }
    this.updateViewTitle()
  }

  handleDateClick(info: any): void {
    alert(`Clicked on date: ${info.dateStr}`)
  }

  handleEventClick(info: any): void {
    this.selectedEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      extendedProps: info.event.extendedProps,
    }
    this.showEventModal = true
  }

  openAddEventModal(): void {
    this.showAddEventModal = true
  }

  closeAddEventModal(): void {
    this.showAddEventModal = false;
    this.newEvent = { title: '', start: '', description: '' };
  }

  saveNewEvent(event: Event): void {
    event.preventDefault();
    if (this.newEvent.title && this.newEvent.start) {
      this.addEvent(this.newEvent.title, this.newEvent.start, this.newEvent.description);
      this.closeAddEventModal();
    } else {
      alert('Please fill out all required fields.');
    }
  }

  today(): void {
    const calendarApi = (
      document.querySelector('full-calendar') as any
    )?.getApi()
    calendarApi?.today()
    this.updateViewTitle()
  }

  next(): void {
    const calendarApi = (
      document.querySelector('full-calendar') as any
    )?.getApi()
    calendarApi?.next()
    this.updateViewTitle()
  }

  prev(): void {
    const calendarApi = (
      document.querySelector('full-calendar') as any
    )?.getApi()
    calendarApi?.prev()
    this.updateViewTitle()
  }

  onModalClick(event: MouseEvent): void {
    event.stopPropagation()
  }

  updateViewTitle(): void {
    const calendarElement = document.querySelector('full-calendar') as any;
    if (!calendarElement) {
      console.error('FullCalendar element not found.');
      return;
    }

    const calendarApi = calendarElement.getApi();
    if (!calendarApi) {
      console.error('Calendar API is not available.');
      return;
    }

    const view = calendarApi.view;
    if (view.type === 'dayGridMonth') {
      this.currentViewTitle =
        'Month View: ' + this.datePipe.transform(view.currentStart, 'MMMM y');
    } else if (view.type === 'timeGridWeek') {
      const start = this.datePipe.transform(view.currentStart, 'MMM d');
      const end = this.datePipe.transform(view.currentEnd, 'MMM d');
      this.currentViewTitle = `Week View: ${start} - ${end}`;
    } else if (view.type === 'timeGridDay') {
      this.currentViewTitle =
        'Day View: ' + this.datePipe.transform(view.currentStart, 'fullDate');
    } else {
      this.currentViewTitle = 'Unknown View';
    }
  }

  addEvent(title: string, date: string, description: string = 'No description provided'): void {
    if (title && date) {
      const newEvent = {
        title,
        start: date,
        description,
      };
      this.calendarOptions = {
        ...this.calendarOptions,
        events: [...this.calendarOptions.events, newEvent],
      };
      this.updateViewTitle();
      alert(`Event "${title}" added on ${date}!`);
    } else {
      alert('Event title and date are required.');
    }
  }

  closeEventModal(): void {
    this.showEventModal = false
  }

  deleteEvent(event: any): void {
    this.calendarOptions.events = this.calendarOptions.events.filter(
      (e: any) => e.title !== event.title
    )
    this.closeEventModal()
    alert('Event deleted!')
  }

  editEvent(event: any): void {
    const newTitle = prompt('Edit Event Title:', event.title)
    if (newTitle) {
      event.title = newTitle
      this.closeEventModal()
      alert('Event updated!')
    }
  }
}
