# System Architecture

The hub is back-end server responsible on routes and does the following&#x20;

1. if the user is trying to use chat terminal then the route will direct the user to broadcasting via terminal to all connected devices&#x20;
2. if the user trying to pull data that requires APIs to execute the condition the API requests route will be directed to the APIs third party providers:\
   this can help to get crypto listings IDs, real-time prices, changes in prices and much more.&#x20;
3. if the user tries to send feedback the one time condition will be implemented before routing and it works like this:\
   A. if this is the first time that the user sends their feedback then the feedback message will be sent to the hub and an acknowledgement will be sent to the user \
   B. if the user submitted their feedback before then the feedback mechanism system will detect that the user has submitted their feedback before therefore, their feedback will not be send to the hub and an acknowledgement will be sent to the user.









<figure><img src=".gitbook/assets/learn-architecture (1).jpg" alt=""><figcaption></figcaption></figure>
