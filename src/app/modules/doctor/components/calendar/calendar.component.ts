import { Component } from '@angular/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { FullCalendarModule } from '@fullcalendar/angular'
import { FormsModule } from '@angular/forms'
import { DatePipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, FormsModule, DatePipe, NgIf],
  providers: [DatePipe], // Provide DatePipe here
  templateUrl: './calendar.component.html',
})
export class CalendarComponent {
  calendarOptions: any
  showEventModal = false
  selectedEvent: any = {}
  showAddEventModal = false
  newEvent = { title: '', start: '', description: '' }
  currentViewTitle = 'My Calendar'

  constructor(private datePipe: DatePipe) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      editable: true,
      selectable: true,
      headerToolbar: false,
      dayHeaderFormat: { weekday: 'long' },
      events: [
        { title: 'Meeting', start: '2024-12-20', description: 'Discussion' },
        {
          title: 'Surgery',
          start: '2024-12-21',
          end: '2024-12-22',
          description: 'Operation',
        },
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
    this.showAddEventModal = false
    this.newEvent = { title: '', start: '', description: '' }
  }

  saveNewEvent(event: any): void {
    event.preventDefault()
    this.calendarOptions.events.push({ ...this.newEvent })
    this.closeAddEventModal()
    alert('Event added successfully!')
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
    const calendarElement = document.querySelector('full-calendar') as any
    const calendarApi = calendarElement?.getApi()

    if (calendarApi) {
      const view = calendarApi.view

      if (view.type === 'dayGridMonth') {
        this.currentViewTitle =
          'Month View: ' + this.datePipe.transform(view.currentStart, 'MMMM y')
      } else if (view.type === 'timeGridWeek') {
        const start = this.datePipe.transform(view.currentStart, 'MMM d')
        const end = this.datePipe.transform(view.currentEnd, 'MMM d')
        this.currentViewTitle = `Week View: ${start} - ${end}`
      } else if (view.type === 'timeGridDay') {
        this.currentViewTitle =
          'Day View: ' + this.datePipe.transform(view.currentStart, 'fullDate')
      } else {
        this.currentViewTitle = 'Unknown View'
      }
    } else {
      console.error('Calendar API is not available.')
      this.currentViewTitle = 'Calendar Unavailable'
    }
  }

  addEvent(title: string, date: string, description: string): void {
    const newEvent = {
      title: title,
      start: date,
      description: description,
    }
    this.calendarOptions.events.push(newEvent)
    this.updateViewTitle()
    alert(`Event "${title}" added on ${date}!`)
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
