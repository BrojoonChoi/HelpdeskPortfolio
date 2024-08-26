export const MENUITEMS = [
    {
        menutitle: "MAIN",
        Items: [
            { path: `${import.meta.env.BASE_URL}dashboard`, icon: 'fe fe-home', type: 'link', active: false, selected: false, title: 'Dashboard' },
        ]
    },
    {
        menutitle: "Ticketing",
        Items: [
            { path: `${import.meta.env.BASE_URL}qna`, icon: 'fe fe-home', type: 'link', active: false, selected: false, title: 'Ticketing' },
            { path: `${import.meta.env.BASE_URL}ticketmanagement`, icon: 'fe fe-home', type: 'link', active: false, selected: false, title: 'Ticket Management' },
        ]
    },
    {
        menutitle: "Admin Page",
        Items: [
            { path: `${import.meta.env.BASE_URL}admin/question`, icon: 'fe fe-home', type: 'link', active: false, selected: false, title: 'Question List Management' },
        ]
    },
    {
        menutitle: "etc",
        id: 6,
        Items: [
            {
                path: `${import.meta.env.BASE_URL}ErrorPages`, 
                icon:'fe fe-users',
                type: 'sub',
                active: false,
                selected: false,
                title: 'ErrorPages',
                children: [
                    { path: `${import.meta.env.BASE_URL}ErrorPages/error400`, type: 'link', active: false, selected: false, title: '400' },
                   
    
                ]
    
            },
        ]
    
        },
        {
            menutitle: "SUB MENUS",
            id: 5,
            Items: [
               
                {
                    path: `${import.meta.env.BASE_URL}Submenus`,
                    icon: 'fe fe-align-center',
                    type: 'sub',
                    active: false,
                    selected: false,
                    title: 'Submenus',
                    children: [
                        {
                            type: 'sub', active: false, selected: false, title: 'Submenu1', children:
                                [
                                    { path: `${import.meta.env.BASE_URL}`, type: 'link', active: false, selected: false, title: 'Submenu1.1' },
                                    { path: `${import.meta.env.BASE_URL}`, type: 'link', active: false, selected: false, title: 'Submenu1.2' },
                                    { path: `${import.meta.env.BASE_URL}`, type: 'link', active: false, selected: false, title: 'Submenu1.3' },
    
                                ]
                        },
                        { path: `${import.meta.env.BASE_URL}`, type: 'link', active: false, selected: false, title: 'Submenus2' },
    
                    ]
                },
    
            ]
        },
]