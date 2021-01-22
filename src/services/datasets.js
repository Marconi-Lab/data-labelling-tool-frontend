const datasets = [
    {
        _id: 1,
        name: "Cervical Infection",
        items: [
            {
                _id: 1,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: true,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 2,
                name: "item2",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 3,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: true,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 4,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: true,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 5,
                name: "item2",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 6,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 7,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 8,
                name: "item2",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 9,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: true,
                label: "",
                comment: "",
                labeller: ""
            }
        ]
    },
    {
        _id: 2,
        name: "COVID19 Lung Ultrasound",
        items: [
            {
                _id: 1,
                name: "item1",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 2,
                name: "item2",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            },
            {
                _id: 3,
                name: "item3",
                images: [
                    `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlK72-LwTcxeO3mx4ibazHZylMCFPpbZCU1g&usqp=CAU`,
                    `https://media.sciencephoto.com/image/c0345623/800wm`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/766/2017/12/22/5-pictures-of-cervix-post-sex-1515513603.jpg?resize=480:*`,
                    `https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bcp-cervix-age-23-3rd-preg-8-dpo-copy-0-1486436022.jpg?resize=480:*`
                ],
                labelled: false,
                label: "",
                comment: "",
                labeller: ""
            }
        ]
    }
]

export default datasets;