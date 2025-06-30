import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

# Load your data
raw = pd.read_csv('data/raw.csv')  # Adjust path as needed

# Handle missing values
imputer = SimpleImputer(strategy='mean')
data_imputed = pd.DataFrame(imputer.fit_transform(raw), columns=raw.columns)

# Normalize features
scaler = StandardScaler()
data_scaled = pd.DataFrame(scaler.fit_transform(data_imputed), columns=raw.columns)

data_scaled.to_csv('data/cleaned.csv', index=False)
print('Data cleaned and saved to data/cleaned.csv') 