# FinSight: Consumer Complaint Analysis & Visualization Tool

FinSight is an in-progress full-stack web application for analyzing and visualizing public consumer financial complaint data from the Consumer Financial Protection Bureau (CFPB).

The goal of this project is to make large consumer complaint datasets easier to understand by turning raw complaint records into interactive dashboards, filters, charts, and summary insights.

## Overview

Consumer financial complaint data can be difficult to understand when viewed as a large CSV file or spreadsheet. FinSight aims to solve this by allowing users to explore complaint trends across financial companies, products, states, issues, dates, and company response outcomes.

Users will be able to answer questions such as:

* Which financial companies receive the most complaints?
* What products have the highest complaint volume?
* Which states report the most complaints?
* What complaint issues appear most often?
* Are companies responding to complaints on time?
* How do complaint trends change over time?

## Tech Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* Chart.js or Recharts

### Backend

* Java
* Spring Boot
* REST API

### Database

* PostgreSQL

### Data Source

* CFPB Consumer Complaint Database

## Planned Features

### Version 1

* Dashboard summary cards
* Complaint data table
* Filter complaints by company
* Filter complaints by product
* Filter complaints by state
* Filter complaints by issue
* View top companies by complaint count
* View complaint counts by product
* View complaints over time
* View timely response statistics

### Future Features

* Company comparison tool
* State comparison tool
* Advanced keyword search
* Export filtered complaint data
* Complaint narrative analysis
* Interactive state map
* Python-based data cleaning or analysis scripts

## Project Structure

```text
consumer-complaint-analysis/
├── backend/
├── frontend/
├── data/
├── docs/
│   ├── project-specification.md
│   ├── database-design.md
│   └── api-plan.md
├── .gitignore
└── README.md
```

## Current Status

This project is currently in the planning and early development stage.

Current phase:

```text
Project setup and documentation
```

Next phase:

```text
Backend setup with Java Spring Boot
```

## Author

Somto Ezenagu
