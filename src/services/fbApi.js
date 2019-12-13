export const fetchUserDetails = (fields = { fields: "name,email,picture" }) => new Promise((resolve, reject) => {
    window.FB.api("/me", fields, me => {
        return resolve({
            ...me,
            isLogged: true
        });
    })
})

