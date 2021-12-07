const ListRendering = {
  data() {
    return {
      suggestions: []
    }
  },
  mounted() {
    //get
    //use
    axios.get('/suggestions/')
      .then(function (response) {
        //success
        myapp.suggestions = response.data.suggestions;
        console.log(response);
      })
      .catch(function (error) {
        //error
        console.log(error);
      })
    setInterval(()=> {
      axios.get('/suggestions/')
      .then(function (response) {
        //success
        myapp.suggestions = response.data.suggestions;
        console.log(response);
      })
      .catch(function (error) {
        //error
        console.log(error);
      })
    }, 10000);
  }
}

myapp = Vue.createApp(ListRendering).mount('#list-rendering')
