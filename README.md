# CS348Proj

# Starting local server
Ensure you have a credentials file for your GCP MySQL server.
```creds.json```
Download the cloud_sql_proxy binary.
```wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy```
Start your proxy in a terminal.
```./cloud_sql_proxy  -instances=cs348s2020:us-central1:cs348-1=tcp:3306 -credential_file=creds.json```
In a new terminal, start your server.
```python test.py```