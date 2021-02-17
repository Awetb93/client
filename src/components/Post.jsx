import { CardHeader, Card, CardContent,Avatar } from "@material-ui/core";
import {useHistory} from "react-router-dom"
import Comment from  "./Comments"
import Moment from "moment"
export default function Post({ posts }) {
    const history=useHistory()
    let renderPost;
    if (posts) {
        renderPost = posts.posts.map(post => {
          
            return(
                <Card key={post.id} style={{ marginTop: "10px" }} variant="outlined">
                    <div className="comment">
                    <Avatar onClick={() =>history.push(`/profile/${post.user.id}`) } style={{cursor:"pointer"}}>{post.user.name.split(" ")[0].split("")[0]}</Avatar>
                    <CardHeader subheader={Moment(parseInt(post.createdAt)).fromNow()} />
                   </div>
                    <CardContent>{post.post}</CardContent>   
                    <Comment state={ post} />
            </Card>)
        })
        
    }
    return (
        <div>
          {renderPost}
        </div>
    )
}
