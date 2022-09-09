const sortList = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const sort = urlParams.get('sort');
    const new_sort = (!sort || sort === "asc") ? "desc" : "asc";
    window.location.replace(`/dashboard/admin?sort=${new_sort}`);

};