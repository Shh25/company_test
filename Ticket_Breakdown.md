# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Basic assumptions
1. We can release all changes to production immediately. Usually this varies based on criticality of the components and need to be released accordingly. Deployment strategies include using canaries, blue/green deployments etc. I will be using basic deployment strategy here where this change is first tested in a pre-production environment and then released to production for all customers directly.
2. There exists 4 CRUD APIs respectively for all tables in the database. This was done to reduce the complexity. In a real environment, we may have more APIs and higher complexity.
3. All tasks include adding unit tests as part of implementation
4. All estimations have been done considering a production system with the following numbers. Note: With different set of numbers, estimates change for testing, release and deployment based on the impact.
    - Number of facilities range [25-50]
    - Number of agents per facility range [0-50]
    - Number of Shifts per week per agent range [0-5]

5. All dates have been set based on the usage of the delivery reports. Since they are generated quarterly, we have started working on this issue right after the last report is generated and is finished before the next report needs to be generated.




### Solution ###

---------------
Parent Ticket 1
---------------

## Issue
Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

## Related Tickets
- Ticket 2
- Ticket 3
- Ticket 4
- Ticket 5

## Progress chart
----------------------------------------------------------------------------------
| Tickets  | Status (not started/in implementation/blocked/delayed) | Due Date   |
----------------------------------------------------------------------------------
| Ticket 2 | not started                                            | 01/30/2023 |
| Ticket 3 | not started                                            | 02/01/2023 |
| Ticket 4 | not started                                            | 02/10/2023 |
----------------------------------------------------------------------------------





-------------
Ticket 2
-------------

## Issue
Add 1 new column to Agent table called `facility_agent_id`. This field can be null but has to be unique. It will initially contain the value `null`. This value can be updated at anytime by a facility.

## Task breakdown with unit tests
1. Create new column in Agent database with name `facility_agent_id`. This column should accept a string of length same as agent_id. It should be nullable. [3 days]
2. This field should be maintained as unique per facility_id [1 day]
3. Update Agent APIs using Agent table to allow CRUD operations with `facility_agent_id` [-]
    a. Create API should allow adding `facility_agent_id` while creating an agent if this information is  available. This value should be set to null by default. [2 days]
    b. List API should return `facility_agent_id` while returning list of agents. [2 days]
    c. Update Create API to allow adding `facility_agent_id` while creating an agent if this information is  available. This value should be set to null by default. [2 days]
    d. Update Create API to allow adding `facility_agent_id` while creating an agent if this information is  available. This value should be set to null by default. [2 days]

5. Integration tests for Agent table, APIs [2 days]
6. Testing and Release to pre-production environment [2 day]
7. Smoke test and Load test in pre-production environment for Agent table, APIs [2 days]
8. Release to production [1 day]

## Assumptions
1. Agent table contains `facility_id` as an existing column
2. Agent table has 4 APIs for CRUD operations

## Acceptance Criteria
- `facility_agent_id` column is created in the table `Agent`
- `facility_agent_id` field can be updated using all existing CRUD APIs for Agent table

## Due Dates
Total estimate - 19 days + 2 days buffer
Start Date - 01/02/2023
End Date - 01/30/2023

## Related Tickets
- Ticket 1

## Comments
- If any of the given assumptyions are not correct or valid, please reach out to the creator of the ticket or POC to rectify the provided solution or given dates.
- Delays with delivery need to be communicated with the product managers/ customers as the due dates have been set accordingly. They have an impact on dependent tickets.
- These tasks have been combined intentionally as any table updates should include API updates.


-------------
Ticket 3
-------------

## Issue
Add `facility_agent_id` from Agent table in list of shifts returned in `getShiftsByFacility` function

## Task breakdown with unit tests
1. Add `facility_agent_id` to list of shifts returned by `getShiftsByFacility` function [2 days]
2. Integration tests [1 day]
3. Testing and Release to pre-production environment [1 day]
4. Release to production [1 day]

## Assumptions
1. Ticket 2 should be released to pre-production environment before we start working on this ticket. Please track Ticket 2 for updates.
    - This ticket can be released to pre-production only after Ticket 2 is released in pre-production environment. 
    - This ticket can be released to production only after Ticket 2 is released in production environment. 


## Acceptance Criteria
`facility_agent_id` field should be returned on calling `getShiftsByFacility` function for each shift in the list of shifts

## Due Dates
Total estimate - 5 days + 1 days buffer
Start Date - 01/25/2023
End Date - 02/01/2023

## Related Tickets
- Ticket 1
- Ticket 2


## Comments
- If any of the given assumptyions are not correct or valid, please reach out to the creator of the ticket or POC to rectify the provided solution or given dates.
- Delays with delivery need to be communicated with the product managers/ customers as the due dates have been set accordingly. They have an impact on dependent tickets.


-------------
Ticket 4
-------------

## Issue
Add `facility_agent_id` from given list of shifts in `generateReport` function to generate report by `facility_agent_id`

## Task breakdown with unit tests
1. Update group by in facility report to group by `facility_agent_id` instead of `agent_id`. `facility_agent_id` should be the first column in the generated report [2 days]
2. Add a new column (2nd column) to display `agent_id` field [1 day]
3. All other fields and columns in the generated report should not be modified. [1 day]
4. Integration tests [1 day]
5. Testing and Release to pre-production environment [1 day]
5. Smoke test and Load test in pre-production environment [1 day]
6. Release to production [1 day]

## Assumptions
1. Ticket 3 should be released to pre-production environment before we start working on this ticket. Please track Ticket 3 for updates.
    - This ticket can be released to pre-production only after Ticket 3 is released in pre-production environment. 
    - This ticket can be released to production only after Ticket 3 is released in production environment. 


## Acceptance Criteria
1. `facility_agent_id` is used to group shifts in the generated report
2. `facility_agent_id` column is added as the first column to the generated report by the facilities
3. All other columns in generated report exist as is and are not changed in value. They move by 1 column. For instance, column 1 in old report will be column 2 in new report and so on.

## Due Dates
Total estimate - 8 days + 1 days buffer
Start Date - 01/31/2023
End Date - 02/10/2023

## Related Tickets
- Ticket 1
- Ticket 2
- Ticket 3

## Comments
- If any of the given assumptyions are not correct or valid, please reach out to the creator of the ticket or POC to rectify the provided solution or given dates.
- Delays with delivery need to be communicated with the product managers/ customers as the due dates have been set accordingly. 
