document.addEventListener("DOMContentLoaded", function () {
    const characterNameInput = document.getElementById("characterName");
    const fetchButton = document.getElementById("fetchButton");
    const outputTextarea = document.getElementById("output");

    fetchButton.addEventListener("click", getApi);

    function getApi() {
        const characterName = characterNameInput.value;
        if (characterName === "") {
            // Display an error message if the input is empty
            outputTextarea.value = "Character name must be entered.";
            return; 
          }
        const fullUri = `https://www.swapi.tech/api/people/?name=${characterName}`;

        fetch(fullUri)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "ok" && data.result.length > 0) {
                    const character = data.result[0].properties;
                    const height = character.height;
                    const mass = character.mass;
                    const gender = character.gender;
                    const hair_color = character.hair_color;

                    const biometrics = `Name: ${characterName}\nHeight: ${height}\nMass: ${mass}\nGender: ${gender}\nHair Color: ${hair_color}`;
                    outputTextarea.value = biometrics;
                } else {
                    outputTextarea.value = "Character not found.";
                }
            })
            .catch((error) => {
                console.error(error);
                outputTextarea.value = "An error occurred. Please try again later.";
            });
    }
});
