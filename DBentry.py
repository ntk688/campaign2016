import pandas
import numpy
import sqlite3

db = sqlite3.connect("expendituresDB.db")

dataF = pandas.read_csv("TaggedExpenditureData.txt", encoding='utf-8', sep='\t',index_col=0,names=["expendID", "candID", "candName","recipientName", "amount", "date", "state", "description", "standardName", "expendType", "expendCategory"], usecols=[0,1,2,3,4,5,7,8,10,11,12], header=0)

dataF['shortDate'] = dataF.date.str[-6:]
dataF.to_sql('expenditures', db, if_exists='replace')