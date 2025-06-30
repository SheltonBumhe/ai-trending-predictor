import pandas as pd
from evidently.report import Report
from evidently.metrics import DataDriftPreset

# Load reference (training) and new (current) data
ref = pd.read_csv('data/cleaned.csv')
new = pd.read_csv('data/new_data.csv')  # Replace with your new data path

report = Report(metrics=[DataDriftPreset()])
report.run(reference_data=ref, current_data=new)
report.save_html('data/drift_report.html')
print('Drift report saved to data/drift_report.html') 