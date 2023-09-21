import { Card } from "@/components/ui"

const Content = [
    {
    id: 1,
        title: "제목1",
        content: "내용1",
    author_name: "닉네임1",
    tag_name: "예식장, 큐시트",
    select : "뮤지컬"
    },
    {
    id: 2,
        title: "제목2",
    content: "내용1",
    author_name: "닉네임2",
    tag_name: "예식장, 큐시트",
    select : "뮤지컬"
    },
    {
    id: 3,
        title: "제목3",
    content: "내용1",
    author_name: "닉네임3",
    tag_name: "예식장, 큐시트",
    select : "뮤지컬"
    },
]

const ContentList = () => {
    return <><div>게시물 리스트</div>
        {Content.map((e) => {
        <Card clickable className="hover:shadow-lg transition duration-150 ease-in-out">
            <div>{e.title}</div>
            <div>{e.content}</div>
            </Card>

})}
</>
}

export default ContentList