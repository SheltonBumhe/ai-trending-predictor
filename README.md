# AI Trend Predictor & ShelFin

**Author: Shelton Bumhe**

A cross-platform, intelligent personal finance and trend prediction suite. Includes:
- **Web, Mobile, Desktop** apps
- **Java Spring Boot** backend (REST API, SQL, JWT, OAuth2)
- **Python ML Engine** (XGBoost, LSTM, MLflow, SHAP, Evidently)
- **Multi-currency, inflation-adjusted analytics**
- **Live rates** (currency, inflation, interest)
- **Professional, modern UI/UX**

---

## Features
- **User Authentication:** Email/password, Google, Apple (JWT-secured)
- **Income/Expense Tracking:** Add, edit, delete, recurring, CSV import/export
- **Analytics Dashboard:**
  - Spending by category/month
  - Smart tips
  - **Inflation-adjusted, multi-currency analytics** (NEW)
  - Interactive charts, currency/country selector
- **Live Rates:** Currency, inflation, interest (auto-updated)
- **ML Forecasts:** Trend & budget prediction, scenario analysis
- **Explainability:** SHAP, MLflow tracking
- **Data Drift Monitoring:** EvidentlyAI

---

## Quickstart

### Backend (Java)
```bash
cd backend-java
mvn spring-boot:run
```

### ML Engine (Python)
```bash
cd ml-engine
pip install -r requirements.txt
python inference_api.py
```

### Web App
```bash
cd web-app
npm install
npm start
```

### Mobile App
```bash
cd MobileApp
npm install
npm start # then run on iOS/Android
```

### Desktop App
```bash
cd electron-app
npm install
npm start
```

---

## Testing
- **Web:** `npm test --prefix web-app`
- **Mobile:** `npm test --prefix MobileApp`
- **Backend:** `mvn test -f backend-java/pom.xml`
- **ML Engine:** (add tests in `ml-engine/` as needed)

---

## API Endpoints
- `/api/shelfin/analytics/inflation-adjusted/{userId}?currency=XXX&country=YYY` — Professional analytics
- `/api/shelfin/rates/inflation` — Live inflation rates
- `/api/shelfin/rates/interest` — Live interest rates
- `/api/transactions` — CRUD for transactions

---

## Dependencies
- **Web:** `recharts`, `react-select`, `react-country-flag`
- **Mobile:** `react-native-svg-charts` or `victory-native`
- **Backend:** Spring Boot, JPA, JWT, OAuth2
- **ML Engine:** xgboost, optuna, mlflow, shap, evidently

---

## Professional UI/UX
- Clean, modern design (light/dark mode)
- Responsive, touch-friendly
- Currency/country selector with flags
- Interactive, animated charts

---

## Contributing
Pull requests welcome! See each subproject's README for details.
