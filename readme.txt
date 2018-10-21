Campaign Expenditures 2016
--------------------------
"campaignsCSS", "campaignsJS", and "campaignsIndex" are the primary html css, and javascript files for the visualization. 

The other JSON files in the folder are data sets used in "campaignsJS." 

"CleanExpend" is a python script which categorizes the candidates' expenditures and outputs "taggedExpenditureData". "timeSeries" is a second script which runs on "taggedExpenditureData" turning it into timeseries data and outputting usable JSON. "expend_data_monthly," and "candidateSums" are both output of this second script. 