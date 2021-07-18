# ![Logo](/front-end/public/favicon.ico) ***Table-It!***

> A modern reservations system for the modern restaurant.

A restaurant host is tasked with quite a bit of management: reservations tracking and table management make up their core responsibilities, requiring a solid overview of their restaurant's demands and available resources. ***Table-It!*** is designed to make their lives easier.

With ***Table-It!***, a host is given access to a high-level dashboard in which they can immediately see and manage the day's current reservations and the restaurant's set of tables. The host is given the tools to:
* Browse reservations by date or search by phone number
* See the status and capacity of the restaruant's tables
* Log new tables and reservations
* Edit existing tables and reservations
* Seat reservations at a table
* Free tables when their associated guests leave the restaurant

In all, ***Table-It*** empowers hosts to efficiently manage their restaurant's resources, easing their burden and ensuring a smooth customer experience from the time the customer calls their reservation in to the time they leave the establishment.

<hr />
Live Application: https://table-it.vercel.app/dashboard

Live API: https://table-it-api.vercel.app/
<hr />

## Sections
### Navigation Menu
![Navigation Menu](/screenshots/menu.png)

The Navigation Menu provides links to the main pages: [Dashboard](#dashboard), [Search](#search), [New Reservation](#new-reservation), and [New Table](#new-table). This menu is persistent across the app to ensure easy access to ***Table-It!***'s main functionality. 

### Dashboard
![Dashboard](/screenshots/dashboard.png)

The Dasbhoard displays, and provides an interface to manage, the restaurant's reservations and tables. At the top of the dasbhoard is the date picker, which the host can interact with to select the date for which reservations should be shown. Below this is the list of reservation cards, as well as the tables overview.

The reservation cards, sorted by time, display relevant information for each individual reservation: a name, phone number, time, party count, and status (Booked, Seated, or Cancelled). If the reservation status is currently Booked, the Seat, Edit and Cancel buttons are displayed. Pressing Seat on a reservation will navigate the host to the [Seat Reservation](#seat-reservation) screen of that particular reservation. Pressing Edit will likewise navigate to the host to the [Edit Reservation](#edit-reservation) screen for the particular reservation. Finally, pressing Cancel will prompt a confirmation dialog on the dashboard. Confriming this dialogue will set the reservation status to Cancelled. Seated or Cancelled reservations cannot be seated, edited, or cancelled, and so these controls are not displayed for such reservations.

The tables overview displays the list of tables in the restaurant. Each table entry displays the relevant information for that table: table name, capacity, and whether the table is currently occupied. If a table *is* currently occupied, it will be accompanied by a Finish button.

![Finishing a table](/screenshots/dashboard-finish.png)

Pressing the Finish button will prompt a confirmation dialogue on the dashboard. Confirming this dialogue will free the table for new reservations and will set the status for the reservation currently sitting at the table to Finished. Finished reservations are removed from the dashboard, and cannot be viewed unless searched for by phone number.

### Search
![Search](/screenshots/search-reservation.png)

The Search screen enables hosts to search for reservations by phone number. The host is presented with a form input in which they can type the phone number either in its entirety or partially. Pressing the Find button will then run the search. All results from this search will be displayed as reservation cards below the form. Reservations with a status of Booked can be Seated, Edited, or Cancelled, just as they can on the Dashboard.

### New Reservation
![New Reservation](/screenshots/new-reservation.png)

The New Reservation screen enables hosts to log new reservations into the application. The screen presents inputs for the following: First Name, Last Name, Phone Number, Reservation Date, Reservation Time, and Party Size. Upon clicking the Submit button, the reservation will be validated for the following:

* The Reservation Date must be made for the current date or some date in the future. Additionally, the Reservation Date cannot fall on a Tuesday; the app is built under the assumption that the restaurant using this application is closed on Tuesdays.
* The Reservation Time must fall between 10:30AM and 9:30PM; these are assumed to correspond to the restaurant's hours of operation. Additionally, if the Reservation Date is made for the current date, the Reservation Time must be some time later than the current time.
* The Party Size must be a whole number greater than 0.
* All inputs must be filled out.

Assuming all of the above validations pass, pressing Submit will log the reservation in the application database. When the reservation is logged, the host is redirected to the Dashboard page associated with the new reservation; i.e., the Dashboard will display all reservations made for the new reservation's Reservation Date.

Pressing Cancel at any time will redirect the host to the previous page.

### New Table
![New Table](/screenshots/new-table.png)

The New Table screen enables hosts to log new tables into the application. The screen presents inputs for the following: Table Name and Capacity. Upon clicking the Submit button, the table will be validated for the following:

* The Capacity must be a whole number greater than 0.
* All inputs must be filled out.

Assuming all of the above validations pass, pressing Submit will log the table in the application database. When the table is logged, the host is redirected to the main Dashboard page; i.e, the Dashboard will display all reservations made for the current date.

Pressing Cancel at any time will redirect the host to the previous page.

### Edit Reservation
![Edit Reservation](/screenshots/edit-reservation.png)

The Edit Reservation screen enables hosts to edit reservations that are currently in the database but have not been Seated, Cancelled, or Finished. The screen presents the same inputs as those found in the [New Reservation](#new-reservation) screen, but pre-fills them with the asscociated reservation information. The host is free to change any of the fields associated with this reservation. Upon clicking the Submit button, the reservation will undergo the same series of validations undergone for [new reservations](#new-reservation).

Assuming all of the validations pass, pressing Sumbit will update the record for the reservation being updated, replacing the old information with the updated information. When the reservation is finished updating, the host is redirected to the Dashboard page associated with the edited reservation; i.e., the Dasbhoard will display all reservations made for the edited reservation's Reservation Date.

Pressing Cancel at any time will redirect the host to the previous page.

### Seat Reservation
![Seat Reservation](/screenshots/seat-reservation.png)

The Seat Reservation screen enables hosts to seat a reservation at any available table. The host is presented with the Reservation Card associated with the reservation, giving them visual confirmation that the correct reservation is being seated. However, the Seat, Edit and Cancel buttons are hidden on this page, so as to prevent accidental modification of the reservation.

Below the Reservation Card, the host is presented with a dropdown selector in which they can pick the table to seat this reservation at. The dropdown presents the complete set of the restaurant's tables, displaying the table name and table capacity for each option. Upon clicking the Submit button, the following validations will occur:

* The Table Capacity of the selected Table must be greater than or equal to the reservation's party count.
* The selected Table must not be currently Occupied.

Assuming all of the above validations pass, pressing Submit will seat the reservation at the selected table. Seating a reservation at a table has two effects:

* The Reservation's status will be updated to Seated.
* The Table's status will be set to Occupied, and the Table will be assocaited with the seated Reservation.

After the above occurs, the host is redirected to the Dashboard page associated with the seated Reservation; i.e., the Dasbhoard will display all reservations made for the seated reservation's Reservation Date.

Pressing Cancel at any time will redirect the host to the previous page.

### Error Alert
![Error Alert](/screenshots/error.png)

The Error Alert is not a distinct screen; however, it will be shown on any of the other screens in the application in the case of an error. The Error Alert alerts hosts to validation errors, should they incorrectly fill out a form, or server errors, should an issue with the application server occur.
