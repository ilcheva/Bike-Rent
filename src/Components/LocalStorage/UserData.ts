

const UserData = () => {
    const localData = localStorage.getItem("data");
    if (localData) {
        let data = JSON.parse(localData);
        return data;
    } else return [];
};
export default UserData;

