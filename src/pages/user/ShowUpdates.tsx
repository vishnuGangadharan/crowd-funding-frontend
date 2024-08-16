import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { getStatusUpdate } from '@/api/user';
import { updates } from '@/services/interface/interface';
import parse from 'html-react-parser';

const ShowUpdates = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get('postId');
    const [status, setStatus] = useState<updates[]>([]);

    useEffect(() => {
        const getUpdate = async () => {
            const response = await getStatusUpdate(postId as string);
            setStatus(response.data);
            console.log("status", response);
        };
        getUpdate();
    }, [postId]);

    const safeParseContent = (content: string | string[] | null | undefined) => {
        if (!content) return null;

        if (Array.isArray(content)) {
            content = content.join(''); // Join array elements into a single string
        }

        if (typeof content === 'string') {
            try {
                return parse(content);
            } catch (error) {
                console.error("Error parsing content:", error);
                return null;
            }
        }

        console.error("Content is not a string or array of strings:", content);
        return null;
    };

    return (
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-20">
            {status && status.length > 0 ? (
                status.map((item, index) => (
                    <Card shadow="sm" key={index} isPressable onPress={() => console.log('item pressed')}>
                        <CardBody className="p-0">
                            <div className={`grid gap-2 ${item.image?.length === 1 && item.video?.length === 1 ? 'grid-cols-2' : 'grid-cols-1'} w-full`}>
                                {item.image && item.image.map((img, indx) => (
                                    <div key={indx} className="w-full">
                                        <img
                                            alt='item'
                                            className="object-cover w-full h-[200px] sm:h-[150px]"
                                            src={img}
                                        />
                                    </div>
                                ))}
                                {item.video && item.video.map((vid, indx) => (
                                    <div key={indx} className="w-full">
                                        <video
                                            key={indx} src={vid} controls className="w-full h-[200px] sm:h-[150px] object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            {safeParseContent(item?.content)}
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <Card className="w-full h-40 text-center flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    <div className="text-lg font-semibold mb-2">
                        
                        No Updates Available
                    </div>
                    <p className="text-sm">Check back later for new updates!</p>
                </Card>
            )}
        </div>
    );
};

export default ShowUpdates;
