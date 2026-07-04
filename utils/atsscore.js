function calculateATS(resumeText, requiredSkills = []) {

    const text = resumeText.toLowerCase();

    let matched = [];
    let missing = [];

    requiredSkills.forEach(skill => {

        if (text.includes(skill.toLowerCase())) {
            matched.push(skill);
        } else {
            missing.push(skill);
        }

    });

    // -------------------------
    // Score Calculation
    // -------------------------

    let score = Math.round(
        (matched.length / requiredSkills.length) * 100
    );

    // Bonus points

    if (text.includes("project"))
        score += 5;

    if (text.includes("intern"))
        score += 3;

    if (text.includes("experience"))
        score += 5;

    if (text.includes("github"))
        score += 2;

    if (text.includes("mongodb"))
        score += 2;

    if (score > 100)
        score = 100;

    // -------------------------
    // Recommendation
    // -------------------------

    let recommendation = "";

    if (score >= 90)
        recommendation = "Selected";

    else if (score >= 80)
        recommendation = "Shortlisted";

    else if (score >= 65)
        recommendation = "Interview";

    else
        recommendation = "Applied";

    return {

        score,

        matched,

        missing,

        recommendation

    };

}

module.exports = calculateATS;