# Database Design

## Purpose

This document outlines the planned database structure for FinSight.

The database will store public CFPB consumer complaint records so the backend can filter, search, summarize, and serve complaint data to the frontend dashboard.

## Main Table

The first version of the project will use one main table:

```text
complaints
