import React, { useState } from 'react';
import Data from '../teddata';

const Ted = () => {
    // Initialize a Set to store unique topic names
    let uniqueTopicNames = new Set();

    // Loop through each entry and extract topic names
    Data.forEach(entry => {
        const topics = JSON.parse(entry.topics);  // Parse the JSON string in the topics field
        topics.forEach(topic => uniqueTopicNames.add(topic.name));  // Add each topic name to the Set
    });

    // Convert the Set back to an array (if needed) and store in state
    const allTopicNames = Array.from(uniqueTopicNames);

    // Use state to manage topic names
    const [catItems, setCatItems] = useState(allTopicNames);

    const[items,setItems]=useState(Data);

    const[filtername,setFiltername]=useState('All');

    const filteritem=(catitem)=>{
        setFiltername(catitem)
        if(catitem==='All'){
            setItems(Data);
            return;
        }
        const updateditem=Data.filter((currElem)=>
        {
            return currElem.topics.includes(catitem)
        })
        setItems(updateditem);
    }

    return (
        <>
            <div className='text-center font-bold text-xl'>TEDx Recommendation</div>

            <div className="navbar flex justify-evenly overflow-x-auto md:gap-4">
                {catItems.map((currElem, index) => {
                    return <button
                     className=' bg-slate-600 p-1 rounded-md md:p-2 '
                     key={index} onClick={()=>filteritem(currElem)}>{currElem}</button>
                })}
            </div>
            
            <div className=" w-[80%] mx-auto ">
                {
                    items.map((currElem)=>{
                      return <a href={currElem.page_url}> <div className="card bg-slate-500 my-3 rounded-lg p-2">
                                <h1 className=' font-semibold'>{currElem.title}</h1>
                                <p>{currElem.summary}</p>
                                {/* <p>{currElem.published_date}</p> */}
                                <p>{currElem.recorded_date}</p>
                                <p>{currElem.duration}sec</p>
                                {/* <p>{currElem.topics}</p> */}
                                <p>{currElem.speakers}</p>
                            </div>
                            </a>
                    })
                }
            </div>
        </>
    );
}

export default Ted;
