import './App.css';

function App() {
  return (
    <>
      <main>
        <header>
          <a href="" className="logo">MyBlog</a>
          <nav>
            <a href="">Login</a>
            <a href="">Register</a>
          </nav>
        </header>

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


        {/* This is the Dummy Post of Visual Apprerance  */}

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

        {/* This is the Dummy Post of Visual Apprerance  */}

      </main >
    </>
  );
}

export default App;
