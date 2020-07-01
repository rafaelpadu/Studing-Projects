export class HttpService {
    
    _handleErros(res){
        if(!res.ok) throw new Error(res.statusText)
        return res;
    }
  
    get(url){
        return fetch(url)
            .then(res => this._handleErros(res))
            .then(res => res.json())
    }
    post(url, dado){
        return fetch(url, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErros(res))
    }
}