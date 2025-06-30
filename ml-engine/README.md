# AI Trend Predictor ML Engine

## Quickstart

1. **Data Cleaning:**
   ```bash
   python data_cleaning.py
   ```
2. **Feature Engineering:**
   ```bash
   python feature_engineering.py
   ```
3. **Train Advanced Model:**
   ```bash
   python train_advanced.py
   ```
4. **Hyperparameter Tuning:**
   ```bash
   python tune_hyperparams.py
   ```
5. **Track Experiments with MLflow:**
   ```bash
   python mlflow_tracking.py
   # Start MLflow UI:
   mlflow ui
   ```
6. **Explain Model Predictions:**
   ```bash
   python explain_model.py
   ```
7. **Run Full Pipeline:**
   ```bash
   python pipeline.py
   ```

## Requirements
Install dependencies:
```bash
pip install -r requirements.txt
```

## Notes
- Update data paths as needed.
- For time series, add LSTM/GRU support in `train_advanced.py`.
- For production, automate retraining and monitoring. 