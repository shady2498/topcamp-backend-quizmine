module.exports = {
    cleanText:function(text) {
        // clean it and return
    },

    isBodyPresent(response) {
        // check if text is between min and max length
        console.log("this is helper", response)
        if (!response) {
            console.log("not")
            return "Content cannot be empty";
      
        }
        else{
            return 0;
        }
    }
}