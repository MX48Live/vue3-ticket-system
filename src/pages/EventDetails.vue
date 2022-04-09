<template>
    <div>
        <div class="cover">
            <div class="background-blur"  :style="`background-image: url(${CoverImge});`"></div>
            <div class="img-container">
                <img :src="CoverImge" alt="">
            </div>
        </div>
        <div class="details">
            <div class="container">

                <SelectTicket />

                <div class="title">
                    <h1>Block Mountain CNX 2022</h1>
                    <div class="desc">งานมหกรรมบล็อกเชนที่ใหญ่ที่สุดในภาคเหนือ</div>
                </div>
                <div class="section-header-block">
                    <div class="date-time">
                        <div>9 เมษายน 2564 - 08:00 - 16:00</div>
                        <div>อุทยานวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเชียงใหม่</div>
                    </div>
                </div>
                <section class="short-description">
                    <p>Organized for the 4th year in a row, which has received a good response from both the government sector, entrepreneurs, investors, and the general public, OM Platform Co., Ltd., together with the Thai Digital Asset Association and network partners In the Blockchain and Digital Asset Industry has foreseen that activities to disseminate knowledge about Blockchain technology, digital assets innovation and related technology It will be able to stimulate knowledge and a correct understanding of how to apply Blockchain technology in business operations for more entrepreneurs in Thailand.</p>
                    <p>It also urged and reminded me of the importance of digital assets that will affect life in the future It is a platform for connecting transactions related to Blockchain technology and digital assets. To create connections in many sectors, full of knowledgeable speakers to share their experiences of Blockchain and digital assets together.</p>
                    <p>April 9, 2022, at the Northern Science and Technology Park, Chiang Mai Province Thailand</p>
                </section>

                <div class="section-header-block">
                    <h2>Agenda</h2>
                </div>
                <section class="agenda">
                    <div class="item" v-for="item in agenda" :key="item.id">
                        <div class="date">
                            <div>{{ item.date }}</div>
                            <div>{{ item.time }}</div>
                        </div>
                        <div class="detail">
                            <div class="session">{{ item.session }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                </section>

                <!-- details.container -->
            </div>
            <footer>
                <div class="container">
                    Copyright © All Right Reserved
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>

    import TicketItem from "@/components/TicketItem.vue"
    import CoverImge from "@/assets/poster.jpg"
    import { agenda } from "@/data/agenda"
    import SelectTicket from "@/components/EventDetails/SelectTicket.vue"

</script>


<style lang="scss" scoped>
    * {
        font-family: 'Noto Sans', 'Noto Sans Thai', sans-serif;
    }
    .cover {
        max-height: 575px;
        text-align: center;
        position: relative;
        overflow: hidden;
        padding-top: 75px;
        margin-bottom: 70px;
        .background-blur {
            background-size: cover;
            background-color: #FFFFFF;
            background-position: center center;
            filter: blur(50px);
            -webkit-filter: blur(50px);
            overflow: hidden;
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            height: 100%;

        }
        .img-container {
            position: relative;
            z-index: 1;
            padding: 40px 10px;
            img {
                max-height: 420px;
                max-width: 100%;
                border-radius: 10px;
            }
        }
    }
    .title {
        h1 {
            font-weight: bold;
            font-size: 40px;
            margin-bottom: 5px;
        }
        .desc {
            font-size: 30px;
            font-weight: normal;
        }
        margin-bottom: 20px;
    }
    .details {
        .container {
            max-width: 900px;
        }
    }

    section {
        margin-bottom: 50px;
        color: #666666;
        font-size: 15px;
    }
    .title {
        color: var(--primary-color);
    }
    .section-header-block {
        border-left: 6px solid var(--primary-color);
        padding-left: 20px;
        margin-bottom: 20px;
        color: var(--primary-color);
    }
    .date-time {
        font-weight: bold;
        color: #444444;
        display: grid;
        grid-gap: 5px;
    }
    .short-description {
        p {
            text-indent: 50px;
            line-height: 1.8em;
        }
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary-color);
        padding: 10px 0px;
    }
    .agenda .item {
        @media screen and (min-width: 768px) {
            display: grid;
            grid-template-columns: 100px 1fr;
        }
        margin-bottom: 10px;
        padding: 10px;
        &:hover {
            background-color: #fafafa;
            @media screen and (min-width: 768px) {
                .date {
                    border-right: 2px solid var(--primary-color);
                }
            }
        }
        .date {
            font-size: 12px;
            @media screen and (min-width: 768px) {
                border-right: 2px solid #DDDDDD;
            }
            > div {
                display: inline-block;
                margin-right: 10px;
                font-weight: bold;
                @media screen and (min-width: 768px) {
                    display: block;
                    font-weight: normal;
                    margin-right: 0;
                }
            }
        }
        .detail {
            @media screen and (min-width: 768px) {
                padding-left: 20px;
            }
            .session {
                font-size: 15px;
            }
            .name {
                font-size: 12px;
            }
        }
    }
    footer {
        color: #FFFFFF;
        background-color: var(--primary-color);
        font-size: 14px;
        text-align: center;
        padding: 20px 0px;
    }
</style>

