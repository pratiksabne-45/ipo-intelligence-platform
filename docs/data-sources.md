# Data Sources — IPO Intelligence Platform

## Overview

The Indian IPO data ecosystem is split into three tiers: **official exchange/regulatory sources**, **semi-official registrar and filing sources**, and **unofficial community sources** (primarily GMP). Each tier has different access methods, data quality, and licensing considerations.

This document describes each source category, what data it provides, and the legal and ethical constraints governing its use.

---

## 1. Official Sources

### 1.1 National Stock Exchange (NSE)

**Website:** https://www.nseindia.com

NSE publishes IPO-related information including:

- Current and upcoming IPO details (open/close dates, price band, lot size)
- Subscription data during the IPO window (category-wise, day-by-day)
- Allotment basis documents

**Access notes:**
- NSE provides a public website with structured data, but its terms of use and any available APIs must be reviewed before programmatic access.
- NSE has previously offered data products and APIs through NSEIT (NSE subsidiary). These require formal agreements.
- Do not scrape NSE pages without verifying that such use is permitted under their Terms of Use.

### 1.2 Bombay Stock Exchange (BSE)

**Website:** https://www.bseindia.com

BSE similarly publishes:

- IPO announcements and issue details
- Subscription statistics (available during and after the subscription window)
- Allotment-related documents

**Relevant BSE sections:**
- Primary Market: https://www.bseindia.com/markets/PublicIssues/IPOMain.aspx
- Corporate Filings: https://www.bseindia.com/corporates/ann.html

**Access notes:**
- BSE offers structured data downloads for some categories (e.g., CSV/Excel files from the website).
- API access through BSE Data Portal (https://bsebhavcopy.bseindia.com or similar) requires account registration and agreement to data licensing terms.
- Review BSE's Terms of Use before any automated data collection.

### 1.3 SEBI EDGAR (Electronic Data Gathering, Analysis and Retrieval)

**Website:** https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13

SEBI EDGAR is India's primary regulatory filing system for securities offerings. It contains:

- Draft Red Herring Prospectus (DRHP) filings
- Red Herring Prospectus (RHP) filings
- Final Prospectus documents

These documents are the **authoritative source** for all IPO details: price band, lot size, issue size, timeline, risk factors, company financials.

**Access notes:**
- SEBI filing documents are public records. Accessing and reading them is generally permissible.
- Extracting structured data from PDF filings requires a parser (e.g., `pdfplumber`, `pymupdf`).
- Verify SEBI's website terms before any automated downloading at scale.

---

## 2. Semi-Official Sources

### 2.1 Registrar Websites

Indian IPO allotment data is managed by Registrar & Transfer Agents (R&T Agents). The major registrars are:

| Registrar | Website |
|-----------|---------|
| KFin Technologies | https://www.kfintech.com |
| Link Intime India | https://www.linkintime.co.in |
| Bigshare Services | https://www.bigshareonline.com |
| Cameo Corporate Services | https://www.cameoindia.com |

Each registrar publishes allotment status lookup tools on their websites. These tools typically accept PAN number, application number, or DP/Client ID.

**Data available:** Allotment status per applicant. Allotment basis documents (aggregate statistics).

**Access notes:**
- These are public-facing tools, but automated scraping may violate their terms. Any integration should check each registrar's terms individually.
- An alternative is to link out to registrar websites rather than re-hosting their data.

### 2.2 DRHP and RHP Documents

Draft and final prospectus documents filed with SEBI are available on:
- SEBI EDGAR (see above)
- NSE: https://www.nseindia.com/companies-listing/corporate-filings-ipo
- BSE: https://www.bseindia.com/markets/PublicIssues/IPOMain.aspx
- The company's own investor relations page
- The lead manager's website

These documents are public records. Parsing them provides the most accurate source of truth for IPO fundamentals.

---

## 3. GMP (Grey Market Premium) Data

### What is GMP?

The **Grey Market Premium** is an unofficial, over-the-counter price at which IPO shares or applications are traded before the official listing. Grey market trades happen between private parties and are neither regulated nor endorsed by SEBI, NSE, or BSE.

**GMP is NOT:**
- An official price from any exchange
- A guaranteed predictor of listing price
- Regulated or audited data

**GMP IS:**
- A community sentiment indicator
- Volatile and can change several times per day
- Sourced from grey market traders and community forums

### Common Community Sources

GMP data is typically collected and published by enthusiast websites and investor communities. These sites aggregate GMP quotes from grey market traders. Some commonly referenced community aggregators include:

- Dedicated IPO GMP tracking websites (verify their terms before use)
- Investment and trading community forums (e.g., Telegram groups, Reddit communities)
- Financial news portals that quote GMP from unnamed market sources

> **Important:** This platform does **not** claim any API access to these sources. Any GMP collection strategy must:
> 1. Identify specific sources
> 2. Review each source's terms of use
> 3. Obtain permission where required
> 4. Attribute data clearly on the platform

### GMP Data Quality Challenges

| Challenge | Description |
|-----------|-------------|
| **No single source of truth** | Different community sources may report different GMP values simultaneously |
| **High volatility** | GMP can change multiple times per day, especially near listing |
| **Stale data risk** | Community sites may not update frequently or flag when data is stale |
| **Outliers** | Erroneous or speculative quotes may appear |
| **No historical archive** | Most community sources show only the current GMP, not historical trends |

---

## 4. Data Verification Strategy

All data ingested into the platform goes through the following quality gates:

### For IPO Fundamental Data (dates, price band, lot size)
1. Parse from DRHP/RHP (primary source).
2. Cross-reference with NSE/BSE listing if available.
3. Mark `is_verified = true` only after cross-referencing two independent sources.

### For Subscription Data
1. Source from NSE or BSE official subscription statistics.
2. Record `source_name` and `collection_timestamp` for every row.
3. Flag discrepancies if the same day's data from two sources differs by more than 5%.

### For GMP Data
1. Collect from identified community sources (after terms review).
2. Store every observation with `source_name`, `source_reference`, `observation_timestamp`, and `raw_value`.
3. Apply statistical outlier detection: flag any value > 3 standard deviations from the recent median.
4. Never overwrite historical GMP values — append only.
5. Display clearly as **"Unofficial GMP"** on the platform with a disclaimer.

---

## 5. Ethical and Legal Considerations

### Terms of Service
Before implementing any automated data collection:
- Read the full Terms of Use / Terms of Service of each target website.
- Look specifically for clauses on automated access, scraping, commercial use, and data redistribution.
- If terms are unclear, contact the site owner or seek legal advice.

### `robots.txt`
Respect each site's `robots.txt` before crawling. Even if a page is publicly accessible, `robots.txt` may prohibit automated crawlers.

### Data Redistribution
Collecting and re-presenting public data may be permissible, but:
- Official exchange data (NSE/BSE) is often proprietary and requires a data licence for commercial redistribution.
- GMP data, being community-sourced, has no single rights holder, but source attribution is good practice.

### Attribution
Every data point displayed on the platform must show its source (e.g., "Source: NSE" or "Source: Community GMP aggregator — unofficial estimate").

---

## 6. What NOT to Do

> [!CAUTION]
> The following actions are explicitly prohibited in this project:

- **Do not scrape NSE/BSE without reviewing and complying with their Terms of Use.**
- **Do not present GMP as official exchange data.** Always label it as an unofficial grey market estimate.
- **Do not remove or obscure source attribution** for any data displayed on the platform.
- **Do not cache and redistribute official exchange data** without a valid data licence.
- **Do not build tools that circumvent login walls or CAPTCHAs** on registrar or exchange websites.
- **Do not store or display PAN numbers or personal applicant data** collected from registrar lookups.

---

## 7. Milestone 1 Position

In Milestone 1, **no automated data collection is implemented.** The backend provides the data model and API, but all IPO data is either:
- Seeded manually for demonstration purposes, or
- Left as empty tables awaiting pipeline implementation.

Milestone 2 will begin the data pipeline work, starting with a thorough review of each source's terms of access.
