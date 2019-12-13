export const fetchUserDetails = (fields = { fields: "name,email,picture" }) => new Promise((resolve, reject) => {
    window.FB.api("/me", fields, me => {
        return resolve({
            ...me,
            isLogged: true
        });
    })
})

export const fetchUserPhotos = () => new Promise((resolve, reject) =>
    window.FB.api("/me?fields=albums{name,count,cover_photo{picture},photos{picture,images,likes.summary(true).filter(stream)}}", data => resolve(data))
);