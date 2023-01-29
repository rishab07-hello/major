from pyresparser import ResumeParser
import PyPDF2
from docx import Document
from flask import Flask,render_template,redirect,request
import numpy as np
import pandas as pd
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import wordnet
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app=Flask(__name__)

@app.route('/')
def hello():
    return render_template("model.html")

@app.route('/home')
def home():
    return redirect('/')

@app.route('/submit',methods=['POST'])
def submit_data():
    if request.method=='POST':
        resume=request.files['userfile']
        data = pd.read_csv('skills.csv')
        
        stop = stopwords.words('english')
        stemmer = SnowballStemmer('english')
        data['clean_keywords'] = data[' Keywords'].astype('str').apply(lambda x: str.lower(x))
        data['clean_keywords'] = data['clean_keywords'].apply(lambda words: ' '.join(word.lower() for word in words.split() if word not in stop))
        data['clean_keywords'] = data['clean_keywords'].apply(lambda words: ' '.join(stemmer.stem(word) for word in words.split()))
        pdfReader = PyPDF2.PdfFileReader(resume)
        pagehandle = pdfReader.getPage(0)
        text=pagehandle.extractText()
        text.replace("\n"," ")
        # print(data)
        li = []
        for word in text.split():
            if word not in stop:
                stemmedword = stemmer.stem(word)
                li.append(stemmedword)
                text = ' '.join(li)
        Word = []
        for word in text.split():
            Word.append(word)
        vectorizer = TfidfVectorizer()
        combine = []
        combine.append(text)
        for i in data['clean_keywords']:
            combine.append(i)
        # print(combine)
        ans= vectorizer.fit_transform(combine)
        cosine_similarities = cosine_similarity(ans,ans)
        for i in range(0, len(cosine_similarities)):
            cosine_similarities[i] = cosine_similarities[i] * 1000
        for i in range(1, len(cosine_similarities[0][1:])+1):
            com = cosine_similarities[0][i]
            if(com > float(100)):
                cosine_similarities[0][i] = float(100)
            cosine_similarities[0][i]=round(cosine_similarities[0][i],2)
        list=[]
        for i in (cosine_similarities[0][1:]):
            list.append(i)
        skill = data['Skills'].tolist()
        newValue = {'Skills': skill,
            'Percentage': list}
        newData = pd.DataFrame(newValue)        
        
    return render_template('newmodel.html', Predict_score=list,Skills=skill)
if __name__ == '__main__':
    app.debug = True
    app.run()
