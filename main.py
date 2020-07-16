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
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    cur.close
    return render_template('index.html')


@app.route('/bubble chart')
def graph1():
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    print(data)
    cur.close
    return render_template('bubble3.html')


@app.route('/Geo choropleth')
def graph2():
    cur = mysql.connection.cursor()
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
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
    cur.execute(
        "SELECT name, latitude, longitude, count FROM long_lat, countries WHERE countries.citizenship=long_lat.name")
    data = cur.fetchall()
    return jsonify(data)


@app.route('/country')
def fetch_countries():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT citizenship FROM countries"
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


# @app.route('/level')
# def fetch_level():
#     cur = mysql.connection.cursor()
#     select = "SELECT level FROM demographic"
#     cur.execute(select)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/country/genders',  methods=['POST'])
# def fetch_genders_by_country():
#     cur = mysql.connection.cursor()
#     select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND citizenship = %s  GROUP BY gender"
#     if request.form.get('country') == 'null':
#         print('yes It works')
#     params = (request.form.get('country'),)
#     print(params)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/faculties/genders',  methods=['POST'])
# def fetch_genders_by_feculties():
#     cur = mysql.connection.cursor()
#     select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND faculty = %s  GROUP BY gender"
#     params1 = (request.form.get('faculty'),)
#     cur.execute(select, params1)
#     response = cur.fetchall()
#     return jsonify(response)


@app.route('/students')
def fetch_students_by_Years():
    cur = mysql.connection.cursor()
    select = "SELECT SUBSTRING(term,1,4) AS Enroll_Year, COUNT(*) AS total FROM demographic GROUP BY  Enroll_Year"
    print('hello world')
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


# @app.route('/gradundergrad')
# def fetch_graduateUndegraduate():
#     cur = mysql.connection.cursor()
#     select = "SELECT citizenship, COUNT(*) AS total,COUNT(IF(level='Undergraduate',1,null)) as UnderGraduate,COUNT(IF(level='Graduate',1,null)) as Graduate FROM demographic GROUP by citizenship ORDER BY total DESC LIMIT 0,10"
#     cur.execute(select)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/grad')
# def fetch_graduate():
#     cur = mysql.connection.cursor()
#     select = "SELECT citizenship,COUNT(*) AS total, COUNT(IF(level='Graduate',1,null)) as Value FROM demographic GROUP by citizenship ORDER BY total DESC LIMIT 0,10"
#     cur.execute(select)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/undergrad')
# def fetch_undergraduate():
#     cur = mysql.connection.cursor()
#     select = "SELECT citizenship,COUNT(*) AS total, COUNT(IF(level='Undergraduate',1,null)) as Value FROM demographic GROUP by citizenship ORDER BY total DESC LIMIT 0,10"
#     cur.execute(select)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/studentsbyage')
# def fetch_studentsbyage():
#     cur = mysql.connection.cursor()
#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic"
#     cur.execute(select)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/country/age',  methods=['POST'])
# def fetch_age_by_country():
#     cur = mysql.connection.cursor()
#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where citizenship = %s"
#     params = (request.form.get('country'),)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/faculty/age',  methods=['POST'])
# def fetch_age_by_faculty():
#     cur = mysql.connection.cursor()
#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where faculty = %s"
#     params = (request.form.get('faculty'),)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/facultyandcountry/age',  methods=['POST'])
# def fetch_age_by_facultyandcountry():
#     cur = mysql.connection.cursor()
#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where faculty = %s and citizenship = %s"
#     params = (request.form.get('faculty'), request.form.get('country'),)
#     print(params)

#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/facultyandcountry/gender',  methods=['POST'])
# def fetch_gender_by_facultyandcountry():
#     cur = mysql.connection.cursor()
#     select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND faculty = %s and citizenship = %s GROUP BY gender"
#     params = (request.form.get('faculty'), request.form.get('country'),)
#     print(params)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


@app.route('/faculties')
def fetch_feculties():
    cur = mysql.connection.cursor()
    select = "SELECT DISTINCT faculty FROM demographic"
    cur.execute(select)
    response = cur.fetchall()
    return jsonify(response)


# @app.route('/year')
# def fetch_Years():
#     cur = mysql.connection.cursor()
#     select = "SELECT DISTINCT SUBSTR(term,1,4) AS Year FROM demographic"
#     cur.execute(select)
#     response = cur.fetchall()
#     return jsonify(response)


# new apis start from here
# @app.route('/gender/age',  methods=['POST'])
# def fetch_age_by_gender():
#     cur = mysql.connection.cursor()
#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where gender = %s"
#     params = (request.form.get('gender'),)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/facultyandcountryandgrad/gender',  methods=['POST'])
# def fetch_gender_by_facultyandcountryandgradstatus():
#     cur = mysql.connection.cursor()
#     select = "SELECT gender, count(gender) count FROM demographic WHERE gender IS NOT null AND faculty = %s and citizenship = %s and level = %s GROUP BY gender"
#     params = (request.form.get('faculty'), request.form.get(
#         'country'), request.form.get('gradstatus'),)
#     print(params)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/facultyandcountryandgender/age',  methods=['POST'])
# def fetch_age_by_facultyandcountryandgender():
#     cur = mysql.connection.cursor()
#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where faculty = %s and citizenship = %s and gender = %s"
#     params = (request.form.get('faculty'), request.form.get(
#         'country'), request.form.get('gender'))
#     print(params)
#     cur.execute(select, params)
#     response = cur.fetchall()
#     return jsonify(response)


# @app.route('/parentapi/age',  methods=['POST'])
# def fetch_age():
#     faculty_part = " faculty = '{}' "
#     country_part = "and citizenship = '{}' "
#     gender_part = "and gender = '{}' "
#     gradStatus_part = "and level = '{}' "

#     cur = mysql.connection.cursor()

#     print(request.form.get('faculty'))
#     if request.form.get('faculty') != 'null':
#         faculty_part = faculty_part.format(request.form.get('faculty'))
#         print('inside faculty', faculty_part)
#     else:
#         faculty_part = ''
#         country_part = "citizenship = '{}' "

#     if request.form.get('country') != 'null':
#         country_part = country_part.format(request.form.get('country'))
#         print('inside country', country_part)
#     else:
#         country_part = ''
#         gender_part = "gender = '{}' "

#     if request.form.get('gender') != 'null':
#         gender_part = gender_part.format(request.form.get('gender'))
#         print('inside gender', gender_part)
#     else:
#         gender_part = ''
#         gradStatus_part = "level = '{}' "

#     if request.form.get('gradStatus') != 'null':
#         gradStatus_part = gradStatus_part.format(
#             request.form.get('gradStatus'))
#         print('inside gradstatus', gradStatus_part)
#     else:
#         gradStatus_part = ''

#     print('faculty', faculty_part)
#     print('country', country_part)
#     print('gender', gender_part)
#     print('gradstatus', gradStatus_part)

#     select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60  FROM demographic where "
#     final_select = select + faculty_part + \
#         country_part + gender_part + gradStatus_part
#     print(final_select)
#     cur.execute(final_select)
#     response = cur.fetchall()
#     return jsonify(response)

@app.route('/genders',  methods = ['POST'])
def get_genders():
    cur = mysql.connection.cursor()
    select = "SELECT gender, count(gender) count \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
              AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
              GROUP BY gender"
#    params = (request.form.get('gender'),request.form.get('faculty'),request.form.get('country'),request.form.get('year'),request.form.get('level'),)	
    countries = request.form.get('country')
    print(countries)
    genders = request.form.get('gender')
    print(genders)
    levels = request.form.get('level')
    print(levels)
    years = request.form.get('year')
    print(years)#
    faculties = request.form.get('faculty')
    print(faculties)

    select = select.format('NOT' if genders=='any' else '',\
                           'NOT' if faculties=='any' else '',\
                           'NOT' if countries=='any' else '',\
                           'NOT' if years=='any' else '',\
                           'NOT' if levels=='any' else '')
    cur.execute(select, (genders,faculties,countries,years,levels))
    print(cur._executed)
#    cur.execute(select, params)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/ages',methods = ['POST'])
def fetch_by_ages():
    cur = mysql.connection.cursor()
    select = "select COUNT(IF(age BETWEEN 10 AND 20,1,null)) AS age10to20,COUNT(IF(age BETWEEN 20 AND 30,1,null)) AS age20to30,COUNT(IF(age BETWEEN 30 AND 40,1,null)) AS age30to40,COUNT(IF(age BETWEEN 40 AND 50,1,null)) AS age40to50,COUNT(IF(age BETWEEN 50 AND 60,1,null)) AS age50to60 \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
              "
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    print(country)  
    print(gender)
    print(level)
    print(year)
    print(faculty)
    countries = (request.form.get('country'),)
    print(countries)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender=='any' else '',\
			   'NOT' if faculty=='any' else '',\
                           'NOT' if country=='any' else '',\
                           'NOT' if year=='any' else '',\
                           'NOT' if level=='any' else '')
	
    
    cur.execute(select, (genders,faculties,countries,years,levels))
    print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/level',methods = ['POST'])
def fetch_by_level():
    cur = mysql.connection.cursor()
    select = "select gender, count(gender) \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
                  group by level
              "
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    print(country)  
    print(gender)
    print(level)
    print(year)
    print(faculty)
    countries = (request.form.get('country'),)
    print(countries)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender=='any' else '',\
			   'NOT' if faculty=='any' else '',\
                           'NOT' if country=='any' else '',\
                           'NOT' if year=='any' else '',\
                           'NOT' if level=='any' else '')
	
    
    cur.execute(select, (genders,faculties,countries,years,levels))
    print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)


@app.route('/residency',methods = ['POST'])
def fetch_by_residency():
    cur = mysql.connection.cursor()
    select = "select residency, count(residency) \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
                  group by residency
              "
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    print(country)  
    print(gender)
    print(level)
    print(year)
    print(faculty)
    countries = (request.form.get('country'),)
    print(countries)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender=='any' else '',\
			   'NOT' if faculty=='any' else '',\
                           'NOT' if country=='any' else '',\
                           'NOT' if year=='any' else '',\
                           'NOT' if level=='any' else '')
	
    
    cur.execute(select, (genders,faculties,countries,years,levels))
    print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/pt_ft',methods = ['POST'])
def fetch_by_pt_ft():
    cur = mysql.connection.cursor()
    select = "select pt_ft, count(pt_ft) \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
            AND pt_ft IS NOT NULL \
                  group by pt_ft
              "
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    print(country)  
    print(gender)
    print(level)
    print(year)
    print(faculty)
    countries = (request.form.get('country'),)
    print(countries)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender=='any' else '',\
			   'NOT' if faculty=='any' else '',\
                           'NOT' if country=='any' else '',\
                           'NOT' if year=='any' else '',\
                           'NOT' if level=='any' else '')
	
    
    cur.execute(select, (genders,faculties,countries,years,levels))
    print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)

@app.route('/faculty',methods = ['POST'])
def fetch_by_level():
    cur = mysql.connection.cursor()
    select = "select faculty, count(faculty) \
              FROM demographic \
              WHERE \
              {0} FIND_IN_SET(gender, %s) \
	      AND {1} FIND_IN_SET(faculty, %s) \
              AND {2} FIND_IN_SET(citizenship, %s) \
              AND {3} FIND_IN_SET(SUBSTR(term,1,4), %s) \
              AND {4} FIND_IN_SET(level, %s) \
                  group by faculty
              "
    country = request.form.get('country')
    gender = request.form.get('gender')
    level = request.form.get('level')
    year = request.form.get('year')
    faculty = request.form.get('faculty')

    print(country)  
    print(gender)
    print(level)
    print(year)
    print(faculty)
    countries = (request.form.get('country'),)
    print(countries)
    genders = (request.form.get('gender'),)
    levels = (request.form.get('level'),)
    years = (request.form.get('year'),)
    faculties = (request.form.get('faculty'),)

    select = select.format('NOT' if gender=='any' else '',\
			   'NOT' if faculty=='any' else '',\
                           'NOT' if country=='any' else '',\
                           'NOT' if year=='any' else '',\
                           'NOT' if level=='any' else '')
	
    
    cur.execute(select, (genders,faculties,countries,years,levels))
    print(cur._executed)
    response = cur.fetchall()
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host='0.0.0.0')
