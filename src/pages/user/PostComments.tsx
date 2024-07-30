import { geComments, postComment } from '@/api/user';
import React, { useEffect, useState } from 'react'

interface commentProps {
    postId?: string | undefined
    userId?: string
    comment?:string;
    createdAt?: Date;
    updatedAt?: Date;
    userName?:string
    
}

const PostComments :React.FC<commentProps>= ({postId, userId}) => {

    const [comment, setComment] = useState('');
    const [showComment, setShowComment] = useState<commentProps[]>([]); 


    const fetchComments = async () => {
        try{
            console.log("inside",postId);
            
            const response = await geComments(postId as string)
            console.log("resmes",response.data);
            setShowComment(response.data)
            
        }catch(error){
            console.log(error);
            
        }
    }

    useEffect(() => {
     fetchComments()
     console.log("efff");
     

    },[])


    
    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (comment.trim() === "") {
                return;
            }
            const response = await postComment(comment, postId as string, userId as string);
           console.log("Comment posted successfully", response);
           setComment("");
           fetchComments();
        } catch (error) {
            console.log("Error posting comment:", error);
        }
    };


    return (
        <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-2xl  mt-3">
            <form onSubmit={handleCommentSubmit} className="flex space-x-2 mt-3">
                <input
                    type="text"
                    placeholder="Write something..."
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>

            <div className="flex items-center justify-between mt-4">
                
            </div>
            <div className="mt-2 max-h-96 overflow-y-auto custom-scrollbar">
                {showComment.map((item, indx) => (
                    <div key={indx} className="border-t border-gray-200 pt-1 mt-1">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-user-circle text-gray-400"></i>
                            <span className="font-semibold text-gray-800">{item.userName}</span>
                            <span className="text-sm text-gray-400">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</span>
                        </div>
                        <p className="text-gray-600 ml-3">{item?.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostComments
