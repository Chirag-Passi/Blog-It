import React from "react";

export default function Post() {

    return (
        <div className="post">
            <div className="image">
                <img src="https://www.shutterstock.com/image-vector/male-hand-holding-megaphone-new-600w-1547009231.jpg" alt="" />
            </div>

            <div className="texts">
                <h2>XYA jjajajpa</h2>
                <p className="info">
                    <a className="author">Chirag Passi</a>
                    <time>2023-01-07 16:46</time>
                </p>
                <p className="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquid rem harum culpa doloribus perspiciatis magnam molestias adipisci, dolorem in beatae deleniti ipsa ad suscipit eveniet provident id! Dolorem, quaerat.</p>
            </div>
        </div>
    );
}