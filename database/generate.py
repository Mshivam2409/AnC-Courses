def id_generator(chars,size=6):
    return ''.join(random.choice(chars) for _ in range(size))

def generate(years,chars,con):
    db = pd.read_json('students.json')
    df = pd.DataFrame(columns=['userName','password','createdAt','updatedAt'])
    df['userName'] = df['userName'].append(db[(db.i.str.startswith(tuple(years))) & (db.i.str.len() == 6)]['u'])
    df['password'] = [id_generator(chars=chars) for _ in range(0,len(df['userName']))]
    df.reset_index(inplace=True)
    df.index.name = 'id'
    df = df.drop(columns='index')
    df.reset_index().to_json('db.json',orient='records')
    df.to_sql(name='users',con=con)

if __name__ == "__main__":
    try:
        import pandas as pd
        import numpy as np
        import random
        import string
        import wget
        url = 'https://search.pclub.in/api/students'
        wget.download(url)
        connection_string = input('Enter the PostGreSQL Connection String : ')
        years = ['15','16','17','18','19','20']
        generate(years=years,chars=string.ascii_uppercase + string.digits,con=connection_string)
    except ImportError:
        print('Modules not Installed!')
        exit()
    
  

