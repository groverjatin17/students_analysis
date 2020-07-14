# -*- coding: utf-8 -*-
"""
Created on Tue May 12 14:29:31 2020

@author: arunr
"""

from flask import Flask, render_template, jsonify
from flask_mysqldb import MySQL
from flask import request
from flask_cors import CORS

app = Flask(__name__)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'jatin12'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_DB'] = 'world'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
CORS(app)
mysql = MySQL(app)

@app.route('/')
def main():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    cur.close
    return render_template('index.html')

@app.route('/bubble chart')
def graph1():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    print(data)
    cur.close
    return render_template('bubble3.html')


@app.route('/Geo choropleth')
def graph2():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    print(data)
    cur.close
    return render_template('geoChoropleth-world.html')

@app.route('/Bar_chart')
def graph3():
    return render_template('barchart.html')

@app.route('/api')
def session_api():
    cur = mysql.connection.cursor()
    cur.execute("SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    return jsonify(data)

@app.route('/country')
def fetch_countries():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT citizenship FROM countries";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/level')
def fetch_level():
    cur = mysql.connection.cursor()
    select = "SELECT level FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/country/genders',  methods = ['POST'])
def fetch_genders_by_country():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND citizenship = %s  GROUP BY gender"
    params = (request.form.get('country'),)
    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/faculties/genders',  methods = ['POST'])
def fetch_genders_by_feculties():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND faculty = %s  GROUP BY gender";
    params1 = (request.form.get('faculty'),)
    cur.execute(select, params1)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/students')
def fetch_students_by_Years():
    cur = mysql.connection.cursor()
    select = "SELECT SUBSTRING(term,1,4) AS Enroll_Year, COUNT(*) AS total FROM demographic GROUP BY  Enroll_Year";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/gradundergrad')
def fetch_graduateUndegraduate():
    cur = mysql.connection.cursor()
    select = "SELECT citizenship, COUNT(*) AS total,COUNT(IF(level='Undergraduate',1,null)) as UnderGraduate,COUNT(IF(level='Graduate',1,null)) as Graduate FROM demographic GROUP by citizenship ORDER BY total DESC LIMIT 0,10";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/grad')
def fetch_graduate():
    cur = mysql.connection.cursor()
    select = "SELECT citizenship,COUNT(*) AS total, COUNT(IF(level='Graduate',1,null)) as Value FROM demographic GROUP by citizenship ORDER BY total DESC LIMIT 0,10";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/undergrad')
def fetch_undergraduate():
    cur = mysql.connection.cursor()
    select = "SELECT citizenship,COUNT(*) AS total, COUNT(IF(level='Undergraduate',1,null)) as Value FROM demographic GROUP by citizenship ORDER BY total DESC LIMIT 0,10";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/studentsbyage')
def fetch_studentsbyage():
    cur = mysql.connection.cursor()
    select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/country/age',  methods = ['POST'])
def fetch_age_by_country():
    cur = mysql.connection.cursor()
    select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where citizenship = %s"
    params = (request.form.get('country'),)
    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/faculty/age',  methods = ['POST'])
def fetch_age_by_faculty():
    cur = mysql.connection.cursor()
    select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where faculty = %s"
    params = (request.form.get('faculty'),)
    
    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/facultyandcountry/age',  methods = ['POST'])
def fetch_age_by_facultyandcountry():
    cur = mysql.connection.cursor()
    select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where faculty = %s and citizenship = %s"
    params = (request.form.get('faculty'),request.form.get('country'),)
    print(params)
    
    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/facultyandcountry/gender',  methods = ['POST'])
def fetch_gender_by_facultyandcountry():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND faculty = %s and citizenship = %s GROUP BY gender"
    params = (request.form.get('faculty'),request.form.get('country'),)
    print(params)
    
    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/faculties')
def fetch_feculties():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT faculty FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/year')
def fetch_Years():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT SUBSTR(term,1,4) AS Year FROM demographic";
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)
	
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host = '0.0.0.0')
