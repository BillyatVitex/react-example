import { useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

export default function ExtractingStateLogicIntoAReducer() {

    const initialTravelPlan = {
        0: {
            id: 0,
            title: '(Root)',
            childIds: [1, 42, 46],
        },
        1: {
            id: 1,
            title: 'Earth',
            childIds: [2, 10, 19, 26, 34]
        },
        2: {
            id: 2,
            title: 'Africa',
            childIds: [3, 4, 5, 6, 7, 8, 9]
        },
        3: {
            id: 3,
            title: 'Botswana',
            childIds: []
        },
        4: {
            id: 4,
            title: 'Egypt',
            childIds: []
        },
        5: {
            id: 5,
            title: 'Kenya',
            childIds: []
        },
        6: {
            id: 6,
            title: 'Madagascar',
            childIds: []
        },
        7: {
            id: 7,
            title: 'Morocco',
            childIds: []
        },
        8: {
            id: 8,
            title: 'Nigeria',
            childIds: []
        },
        9: {
            id: 9,
            title: 'South Africa',
            childIds: []
        },
        10: {
            id: 10,
            title: 'Americas',
            childIds: [11, 12, 13, 14, 15, 16, 17, 18],
        },
        11: {
            id: 11,
            title: 'Argentina',
            childIds: []
        },
        12: {
            id: 12,
            title: 'Brazil',
            childIds: []
        },
        13: {
            id: 13,
            title: 'Barbados',
            childIds: []
        },
        14: {
            id: 14,
            title: 'Canada',
            childIds: []
        },
        15: {
            id: 15,
            title: 'Jamaica',
            childIds: []
        },
        16: {
            id: 16,
            title: 'Mexico',
            childIds: []
        },
        17: {
            id: 17,
            title: 'Trinidad and Tobago',
            childIds: []
        },
        18: {
            id: 18,
            title: 'Venezuela',
            childIds: []
        },
        19: {
            id: 19,
            title: 'Asia',
            childIds: [20, 21, 22, 23, 24, 25],
        },
        20: {
            id: 20,
            title: 'China',
            childIds: []
        },
        21: {
            id: 21,
            title: 'India',
            childIds: []
        },
        22: {
            id: 22,
            title: 'Singapore',
            childIds: []
        },
        23: {
            id: 23,
            title: 'South Korea',
            childIds: []
        },
        24: {
            id: 24,
            title: 'Thailand',
            childIds: []
        },
        25: {
            id: 25,
            title: 'Vietnam',
            childIds: []
        },
        26: {
            id: 26,
            title: 'Europe',
            childIds: [27, 28, 29, 30, 31, 32, 33],
        },
        27: {
            id: 27,
            title: 'Croatia',
            childIds: []
        },
        28: {
            id: 28,
            title: 'France',
            childIds: []
        },
        29: {
            id: 29,
            title: 'Germany',
            childIds: []
        },
        30: {
            id: 30,
            title: 'Italy',
            childIds: []
        },
        31: {
            id: 31,
            title: 'Portugal',
            childIds: []
        },
        32: {
            id: 32,
            title: 'Spain',
            childIds: []
        },
        33: {
            id: 33,
            title: 'Turkey',
            childIds: []
        },
        34: {
            id: 34,
            title: 'Oceania',
            childIds: [35, 36, 37, 38, 39, 40, 41],
        },
        35: {
            id: 35,
            title: 'Australia',
            childIds: []
        },
        36: {
            id: 36,
            title: 'Bora Bora (French Polynesia)',
            childIds: []
        },
        37: {
            id: 37,
            title: 'Easter Island (Chile)',
            childIds: []
        },
        38: {
            id: 38,
            title: 'Fiji',
            childIds: []
        },
        39: {
            id: 40,
            title: 'Hawaii (the USA)',
            childIds: []
        },
        40: {
            id: 40,
            title: 'New Zealand',
            childIds: []
        },
        41: {
            id: 41,
            title: 'Vanuatu',
            childIds: []
        },
        42: {
            id: 42,
            title: 'Moon',
            childIds: [43, 44, 45]
        },
        43: {
            id: 43,
            title: 'Rheita',
            childIds: []
        },
        44: {
            id: 44,
            title: 'Piccolomini',
            childIds: []
        },
        45: {
            id: 45,
            title: 'Tycho',
            childIds: []
        },
        46: {
            id: 46,
            title: 'Mars',
            childIds: [47, 48]
        },
        47: {
            id: 47,
            title: 'Corn Town',
            childIds: []
        },
        48: {
            id: 48,
            title: 'Green Hill',
            childIds: []
        }
    };
    const [plan, setPlan] = useState(initialTravelPlan);

    function handleComplete(parentId, childId) {
        const parent = plan[parentId];
        // Create a new version of the parent place
        // that doesn't include this child ID.
        const nextParent = {
            ...parent,
            childIds: parent.childIds
                .filter(id => id !== childId)
        };
        // Update the root state object...
        setPlan({
            ...plan,
            // ...so that it has the updated parent.
            [parentId]: nextParent
        });
    }

    const root = plan[0];
    const planetIds = root.childIds;

    const initialItems = [
        { title: 'pretzels', id: 0 },
        { title: 'crispy seaweed', id: 1 },
        { title: 'granola bar', id: 2 },
    ];
    const [items, setItems] = useState(initialItems);
    const [selectedItem, setSelectedItem] = useState(
        items[0]
    );

    const [selectedId, setSelectedId] = useState(0);

    const selectedItem2 = items.find(item =>
        item.id === selectedId
    );

    function handleItemChange(id, e) {
        setItems(items.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    title: e.target.value,
                };
            } else {
                return item;
            }
        }));
    }

    return (


        <>
            <h1>
                Choosing the State Structure
            </h1>
            <hr></hr>

            <h3>
                Group related state
            </h3>

            <CopyBlock
                theme={dracula}
                text={`const [x, setX] = useState(0);
const [y, setY] = useState(0);`}
                language='javascript'
            />

            <br></br>

            <CopyBlock
                theme={dracula}
                text='const [position, setPosition] = useState({x: 0, y: 0 }});'
                language='javascript'
            />

            Note: Another case where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need. For example, it’s helpful when you have a form where the user can add custom fields
            <hr></hr>

            <h3>Avoid contradictions in state </h3>

            if you forget to call setIsSent and setIsSending together, you may end up in a situation where both isSending and isSent are true at the same time. The more complex your component is, the harder it is to understand what happened.
            <CopyBlock
                theme={dracula}
                text={`const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);`}
                language='javascript'
            />

            <hr></hr>

            <h3>Avoid redundant state </h3>
            If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.

            <CopyBlock
                theme={dracula}
                text={`const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');`
                }
                language='javascript'
            />

            You can always calculate fullName from firstName and lastName during render, so remove it from state.

            <CopyBlock
                theme={dracula}
                text={`const fullName = firstName + ' ' + lastName;
`
                }
                language='javascript'
            />

            <hr></hr>

            <h3>Avoid duplication in state </h3>

            <CopyBlock
                theme={dracula}
                text={`const initialItems = [
    { title: 'pretzels', id: 0 },
    { title: 'crispy seaweed', id: 1 },
    { title: 'granola bar', id: 2 },
];

const [items, setItems] = useState(initialItems);
const [selectedItem, setSelectedItem] = useState(
  items[0]
);
`}
                language='javascript'
            />

            <h5>What's your travel snack?</h5>
            <ul>
                {items.map((item, index) => (
                    <li key={item.id}>
                        <input
                            value={item.title}
                            onChange={e => {
                                handleItemChange(item.id, e)
                            }}
                        />
                        {' '}
                        <button onClick={() => {
                            setSelectedItem(item);
                        }}>Choose</button>
                    </li>
                ))}
            </ul>
            <p>You picked {selectedItem.title}.</p>

            <CopyBlock
                theme={dracula}
                text={`const [items, setItems] = useState(initialItems);
const [selectedId, setSelectedId] = useState(0);

const selectedItem = items.find(item =>
    item.id === selectedId
);  
`}
                language='javascript'
            />


            <h5>What's your travel snack?</h5>
            <ul>
                {items.map((item, index) => (
                    <li key={item.id}>
                        <input
                            value={item.title}
                            onChange={e => {
                                handleItemChange(item.id, e)
                            }}
                        />
                        {' '}
                        <button onClick={() => {
                            setSelectedId(item.id);
                        }}>Choose</button>
                    </li>
                ))}
            </ul>
            <p>You picked {selectedItem2.title}.</p>

            <hr></hr>

            <h3>Avoid deeply nested state</h3>

            <CopyBlock
                theme={dracula}
                customStyle={{
                    height: '300px',
                    overflow: 'scroll',
                }}
                text={`export const initialTravelPlan = {
    id: 0,
    title: '(Root)',
    childPlaces: [{
        id: 1,
        title: 'Earth',
        childPlaces: [{
        id: 2,
        title: 'Africa',
        childPlaces: [{
            id: 3,
            title: 'Botswana',
            childPlaces: []
        }, {
            id: 4,
            title: 'Egypt',
            childPlaces: []
        }, {
            id: 5,
            title: 'Kenya',
            childPlaces: []
        }, {
            id: 6,
            title: 'Madagascar',
            childPlaces: []
        }, {
            id: 7,
            title: 'Morocco',
            childPlaces: []
        }, {
            id: 8,
            title: 'Nigeria',
            childPlaces: []
        }, {
            id: 9,
            title: 'South Africa',
            childPlaces: []
        }]
        }, {
        id: 10,
        title: 'Americas',
        childPlaces: [{
            id: 11,
            title: 'Argentina',
            childPlaces: []
        }, {
            id: 12,
            title: 'Brazil',
            childPlaces: []
        }, {
            id: 13,
            title: 'Barbados',
            childPlaces: []
        }, {
            id: 14,
            title: 'Canada',
            childPlaces: []
        }, {
            id: 15,
            title: 'Jamaica',
            childPlaces: []
        }, {
            id: 16,
            title: 'Mexico',
            childPlaces: []
        }, {
            id: 17,
            title: 'Trinidad and Tobago',
            childPlaces: []
        }, {
            id: 18,
            title: 'Venezuela',
            childPlaces: []
        }]
        }, {
        id: 19,
        title: 'Asia',
        childPlaces: [{
            id: 20,
            title: 'China',
            childPlaces: []
        }, {
            id: 21,
            title: 'India',
            childPlaces: []
        }, {
            id: 22,
            title: 'Singapore',
            childPlaces: []
        }, {
            id: 23,
            title: 'South Korea',
            childPlaces: []
        }, {
            id: 24,
            title: 'Thailand',
            childPlaces: []
        }, {
            id: 25,
            title: 'Vietnam',
            childPlaces: []
        }]
        }, {
        id: 26,
        title: 'Europe',
        childPlaces: [{
            id: 27,
            title: 'Croatia',
            childPlaces: [],
        }, {
            id: 28,
            title: 'France',
            childPlaces: [],
        }, {
            id: 29,
            title: 'Germany',
            childPlaces: [],
        }, {
            id: 30,
            title: 'Italy',
            childPlaces: [],
        }, {
            id: 31,
            title: 'Portugal',
            childPlaces: [],
        }, {
            id: 32,
            title: 'Spain',
            childPlaces: [],
        }, {
            id: 33,
            title: 'Turkey',
            childPlaces: [],
        }]
        }, {
        id: 34,
        title: 'Oceania',
        childPlaces: [{
            id: 35,
            title: 'Australia',
            childPlaces: [],
        }, {
            id: 36,
            title: 'Bora Bora (French Polynesia)',
            childPlaces: [],
        }, {
            id: 37,
            title: 'Easter Island (Chile)',
            childPlaces: [],
        }, {
            id: 38,
            title: 'Fiji',
            childPlaces: [],
        }, {
            id: 39,
            title: 'Hawaii (the USA)',
            childPlaces: [],
        }, {
            id: 40,
            title: 'New Zealand',
            childPlaces: [],
        }, {
            id: 41,
            title: 'Vanuatu',
            childPlaces: [],
        }]
        }]
    }, {
        id: 42,
        title: 'Moon',
        childPlaces: [{
        id: 43,
        title: 'Rheita',
        childPlaces: []
        }, {
        id: 44,
        title: 'Piccolomini',
        childPlaces: []
        }, {
        id: 45,
        title: 'Tycho',
        childPlaces: []
        }]
    }, {
        id: 46,
        title: 'Mars',
        childPlaces: [{
        id: 47,
        title: 'Corn Town',
        childPlaces: []
        }, {
        id: 48,
        title: 'Green Hill',
        childPlaces: []      
        }]
    }]
    };
`}
                language='javascript'
            />

            <CopyBlock
                theme={dracula}
                customStyle={{
                    height: '300px',
                    overflow: 'scroll',
                }}
                text={`export const initialTravelPlan = {
    0: {
        id: 0,
        title: '(Root)',
        childIds: [1, 42, 46],
    },
    1: {
        id: 1,
        title: 'Earth',
        childIds: [2, 10, 19, 26, 34]
    },
    2: {
        id: 2,
        title: 'Africa',
        childIds: [3, 4, 5, 6 , 7, 8, 9]
    }, 
    3: {
        id: 3,
        title: 'Botswana',
        childIds: []
    },
    4: {
        id: 4,
        title: 'Egypt',
        childIds: []
    },
    5: {
        id: 5,
        title: 'Kenya',
        childIds: []
    },
    6: {
        id: 6,
        title: 'Madagascar',
        childIds: []
    }, 
    7: {
        id: 7,
        title: 'Morocco',
        childIds: []
    },
    8: {
        id: 8,
        title: 'Nigeria',
        childIds: []
    },
    9: {
        id: 9,
        title: 'South Africa',
        childIds: []
    },
    10: {
        id: 10,
        title: 'Americas',
        childIds: [11, 12, 13, 14, 15, 16, 17, 18],   
    },
    11: {
        id: 11,
        title: 'Argentina',
        childIds: []
    },
    12: {
        id: 12,
        title: 'Brazil',
        childIds: []
    },
    13: {
        id: 13,
        title: 'Barbados',
        childIds: []
    }, 
    14: {
        id: 14,
        title: 'Canada',
        childIds: []
    },
    15: {
        id: 15,
        title: 'Jamaica',
        childIds: []
    },
    16: {
        id: 16,
        title: 'Mexico',
        childIds: []
    },
    17: {
        id: 17,
        title: 'Trinidad and Tobago',
        childIds: []
    },
    18: {
        id: 18,
        title: 'Venezuela',
        childIds: []
    },
    19: {
        id: 19,
        title: 'Asia',
        childIds: [20, 21, 22, 23, 24, 25],   
    },
    20: {
        id: 20,
        title: 'China',
        childIds: []
    },
    21: {
        id: 21,
        title: 'India',
        childIds: []
    },
    22: {
        id: 22,
        title: 'Singapore',
        childIds: []
    },
    23: {
        id: 23,
        title: 'South Korea',
        childIds: []
    },
    24: {
        id: 24,
        title: 'Thailand',
        childIds: []
    },
    25: {
        id: 25,
        title: 'Vietnam',
        childIds: []
    },
    26: {
        id: 26,
        title: 'Europe',
        childIds: [27, 28, 29, 30, 31, 32, 33],   
    },
    27: {
        id: 27,
        title: 'Croatia',
        childIds: []
    },
    28: {
        id: 28,
        title: 'France',
        childIds: []
    },
    29: {
        id: 29,
        title: 'Germany',
        childIds: []
    },
    30: {
        id: 30,
        title: 'Italy',
        childIds: []
    },
    31: {
        id: 31,
        title: 'Portugal',
        childIds: []
    },
    32: {
        id: 32,
        title: 'Spain',
        childIds: []
    },
    33: {
        id: 33,
        title: 'Turkey',
        childIds: []
    },
    34: {
        id: 34,
        title: 'Oceania',
        childIds: [35, 36, 37, 38, 39, 40, 41],   
    },
    35: {
        id: 35,
        title: 'Australia',
        childIds: []
    },
    36: {
        id: 36,
        title: 'Bora Bora (French Polynesia)',
        childIds: []
    },
    37: {
        id: 37,
        title: 'Easter Island (Chile)',
        childIds: []
    },
    38: {
        id: 38,
        title: 'Fiji',
        childIds: []
    },
    39: {
        id: 40,
        title: 'Hawaii (the USA)',
        childIds: []
    },
    40: {
        id: 40,
        title: 'New Zealand',
        childIds: []
    },
    41: {
        id: 41,
        title: 'Vanuatu',
        childIds: []
    },
    42: {
        id: 42,
        title: 'Moon',
        childIds: [43, 44, 45]
    },
    43: {
        id: 43,
        title: 'Rheita',
        childIds: []
    },
    44: {
        id: 44,
        title: 'Piccolomini',
        childIds: []
    },
    45: {
        id: 45,
        title: 'Tycho',
        childIds: []
    },
    46: {
        id: 46,
        title: 'Mars',
        childIds: [47, 48]
    },
    47: {
        id: 47,
        title: 'Corn Town',
        childIds: []
    },
    48: {
        id: 48,
        title: 'Green Hill',
        childIds: []
    }
    };
`}
                language='javascript'
            />
            <CopyBlock
                theme={dracula}
                text={`function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
        ...parent,
        childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // Update the root state object...
    setPlan({
        ...plan,
        // ...so that it has the updated parent.
        [parentId]: nextParent
    });
}
`}
                language='javascript'
            />

            <h2>Places to visit</h2>
            <ol>
                {planetIds.map(id => (
                    <PlaceTree
                        key={id}
                        id={id}
                        parentId={0}
                        placesById={plan}
                        onComplete={handleComplete}
                    />
                ))}
            </ol>

            <h2>Recap</h2>
            <ul>
                <li>
                    If two state variables always update together, consider merging them into one.
                </li>
                <li>
                    Choose your state variables carefully to avoid creating “impossible” states.
                </li>
                <li>
                    Structure your state in a way that reduces the chances that you’ll make a mistake updating it.
                </li>
                <li>
                    Avoid redundant and duplicate state so that you don’t need to keep it in sync.
                </li>
                <li>
                    Don’t put props into state unless you specifically want to prevent updates.
                </li>
                <li>
                    For UI patterns like selection, keep ID or index in state instead of the object itself.
                </li>
                <li>
                    If updating deeply nested state is complicated, try flattening it.
                </li>

            </ul>


        </>
    )
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
    const place = placesById[id];
    const childIds = place.childIds;
    return (
        <li>
            {place.title}
            <button className="btn btn-success m-1" onClick={() => {
                onComplete(parentId, id);
            }}>
                Complete
            </button>
            {childIds.length > 0 &&
                <ol>
                    {childIds.map(childId => (
                        <PlaceTree
                            key={childId}
                            id={childId}
                            parentId={id}
                            placesById={placesById}
                            onComplete={onComplete}
                        />
                    ))}
                </ol>
            }
        </li>
    );
}
