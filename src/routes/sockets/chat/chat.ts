const chatSocket = (io: any) => {
  io.on('connection', function (socket: any) {
    console.log(
      '------------------------CHAT---CONNECTION---SUCCESSFULL--------------------------------------',
    );
    // like post
    // socket.on(eventKeys.like_post, async (keys: ObjectType) => {
    //   const newReq: ProtectedRequest = {
    //     ...socket,
    //     body: keys,
    //   };
    //   const [data] = await CampusTimeLine.likePost(newReq);
    //   io.sockets.emit(eventKeys.like_post_count, data);
    // });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });
};

export default chatSocket;
