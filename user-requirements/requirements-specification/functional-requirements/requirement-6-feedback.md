# Requirement 6: Feedback

**Description & Priority**

Feedback mechanism is very important for us to meet the user experience and for system evolution in the future to add more functionalities to the website, feedback will release the product potential.

The environment that we are working on is volatile especially dealing with crypto currencies, attention to user feedback is important, priority assessment is high.

**Use Case**

After the user view the website the user can submit their feedback as the following:

1. The user can select the section that they want to submit their feedback form for and the sections are:\
   Accessibility, real-time prices, chats, and crypto IDs
2. Satisfaction level: there are three levels scale and they are:\
   very high, medium, and very low
3. Attach file: if the user wants to attach file from their local device, for example the user can take a screenshot for the meant part and submit it with their feedback process.
4. Subject: the user can write a message if they want to.
5. The team will receive the feedback that was submitted by the user to develop the product accordingly.

Scope

The scope of this use case is to provide feedback mechanism for the users to keep developing the system for better user experience and future system evolution.

Description

This use case describes the process of collecting and processing feedback from users regarding a particular feature or functionality within the system.

Flow Description

Precondition

The system is in initialization mode, ready to receive feedback from users.

Activation

This use case starts when a user (referred to as an Actor ) initiates the feedback process.

Main flow

1. The system identifies the specific area or feature for which feedback is being provided.
2. The \<Actor> shares their feedback and provides relevant details. (See A1)
3. The system processes the feedback, recording relevant information for analysis.
4. The \<Actor> receives acknowledgment or confirmation of their submitted feedback.

Alternate flow

1. The system encounters a specific condition in which additional steps are required.
2. The \<Actor> follows the specified steps to address the condition.
3. The use case continues at position 3 of the main flow.

&#x20;

Exceptional flow

1. The system encounters an exceptional condition that requires special handling.
2. The \<Actor> follows the prescribed steps to resolve the exceptional condition.
3. The use case continues at position 4 of the main flow.

&#x20;

Termination

The system presents the next steps or information relevant to the feedback process to terminate.



Post condition

The system transitions into a wait state, ready to receive further feedback.



1. The feedback system should provide a user-friendly interface for input.
2. The system able to capture files and include them with the submission&#x20;
3. Feedback of the users will be stored for future system evolution
4. The acknowledgment to the user may include a reference number for tracking purposes.



<figure><img src="../../../.gitbook/assets/usecase diagram.png" alt=""><figcaption></figcaption></figure>
