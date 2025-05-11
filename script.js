document.addEventListener('DOMContentLoaded', function() {
    const calculationType = document.getElementById('calculation-type');
    const education = document.getElementById('education');
    const familyWealth = document.getElementById('family-wealth');
    const caste = document.getElementById('caste');
    const skillMusic = document.getElementById('skill-music');
    const skillCook = document.getElementById('skill-cook');
    const skillCharacter = document.getElementById('skill-character');
    const skillSing = document.getElementById('skill-sing');
    const ageRadios = document.querySelectorAll('input[name="age"]');
    const reputationParents = document.getElementById('reputation-parents');
    const reputationCharacter = document.getElementById('reputation-character');
    const reputationGeneral = document.getElementById('reputation-general');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    const BASE_PRICE = 100;

    calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get values
        const type = calculationType.value;
        const educationCoeff = parseFloat(education.value);
        const wealthCoeff = parseFloat(familyWealth.value);
        const casteBonus = parseFloat(caste.value);
        
        // Calculate skills
        let skillsBonus = 0;
        if (skillMusic.checked) skillsBonus += parseInt(skillMusic.value);
        if (skillCook.checked) skillsBonus += parseInt(skillCook.value);
        if (skillCharacter.checked) skillsBonus += parseInt(skillCharacter.value);
        if (skillSing.checked) skillsBonus += parseInt(skillSing.value);

        // Get age coefficient
        let ageCoeff = 1.5;
        ageRadios.forEach(radio => {
            if (radio.checked) ageCoeff = parseFloat(radio.value);
        });

        // Calculate reputation
        let reputationCoeff = 1;
        if (reputationParents.checked) reputationCoeff *= parseFloat(reputationParents.value);
        if (reputationCharacter.checked) reputationCoeff *= parseFloat(reputationCharacter.value);
        if (reputationGeneral.checked) skillsBonus += parseInt(reputationGeneral.value);

        // Calculate price
        let price = BASE_PRICE;
        price *= educationCoeff;
        price *= wealthCoeff;
        price += casteBonus;
        price += skillsBonus;
        price *= ageCoeff;
        price *= reputationCoeff;
        price = Math.max(0, Math.round(price));

        // Display result
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `Estimated ${type === 'bride' ? 'Bride' : 'Groom'} Price: <span class="highlight">$${price}</span>`;
    });
});