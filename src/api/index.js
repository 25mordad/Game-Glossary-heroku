import axios from 'axios';
// const corsUrl = "http://0.0.0.0:8080/";

(function() {
    var cors_api_host = 'nameless-sierra-38686.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

const Api = (url,data) => {


    if (!localStorage.getItem('token')) {

      let params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', "8sw09jo6mw0fbzr8218zktyvhg5nol");
      params.append('client_secret', "eqf23i39ai13jiy2ccap3dn4n83l3n");

      axios.post(`https://id.twitch.tv/oauth2/token`, params )
              .then(res => {
                  localStorage.setItem('token', res.data.access_token);
                  window.location.href = '/';
                })
    }

    return axios({
    url: url,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': '8sw09jo6mw0fbzr8218zktyvhg5nol',
        'Authorization': 'Bearer '+localStorage.getItem('token'),
    },
    data: data

    });
}

export default Api;
