import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.feature_selection import SelectKBest, f_regression

# Load cleaned data
cleaned = pd.read_csv('data/cleaned.csv')
X = cleaned.drop('target', axis=1)
y = cleaned['target']

# Polynomial features
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)

# Feature selection
selector = SelectKBest(score_func=f_regression, k=10)
X_selected = selector.fit_transform(X_poly, y)

# Save engineered features
pd.DataFrame(X_selected).to_csv('data/features.csv', index=False)
print('Features engineered and saved to data/features.csv') 