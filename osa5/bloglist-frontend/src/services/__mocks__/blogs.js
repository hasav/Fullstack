const blogs = [
    {
        title: 'First mock blog',
        author: 'First mock author',
        url: 'www.mock1.com',
        likes: 1,
        user: {
            username: 'mocker1',
            name: 'Mocker One',
            id: 'po4wmhp4ph23m2hpmoopm324m24hopm'
        },
        id: 'o342po23t13t3224gg242g24g'
    },
    {
        title: 'Second mock blog',
        author: 'Second mock author',
        url: 'www.mock2.com',
        likes: 2,
        user: {
            username: 'mocker2',
            name: 'Mocker Two',
            id: 'pu42u4hnu4hnh4u42h4m24hopm'
        },
        id: 'o33tg2g42g4dssss3131tr242g24g'
    }

]

const getAll = () => {
    return Promise.resolve(blogs)
}
const setToken = () => {

}

export default { getAll, setToken }