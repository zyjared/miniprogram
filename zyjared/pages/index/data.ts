export const user = {
    avatar: 'https://zyjared.com/avatar.png',
    name: "zyjared",
    ip: "上海",
    description: "多情自古空余恨，好梦由来最易醒。",
    socials: [
        {
            name: 'Github',
            icon: "github",
            url: 'https://github.com/zyjared',
        },
        {
            name: 'Blog',
            icon: "blog",
            url: "https://zyjared.com",
        }
    ].map((item, index) => ({ ...item, id: index + 1 }))
}
