package com.epi.jhipster.web.rest;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/test")
public class TwillioController {

    public static final String ACCOUNT_SID = "AC5b591b2555fbf04c9b20687838aeff7c";
    public static final String AUTH_TOKEN = "1cac7a05f76d33dd4ccb8e261583feb7";
    public static final String TWILIO_NUMBER = "+44 7588 686017";

    @GetMapping(value = "/send")
    public void twilioSendMessage(){
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

            Message sendMessage = Message
                .creator(new PhoneNumber("+94767068361"), // to
                    new PhoneNumber(TWILIO_NUMBER), // from
                    "New Ticket generated for you" +
                        "BOC Bank - Issue regarding Brancheless Banking ")
                .create();

            System.out.println(sendMessage);

        /*Message message1 = Message
                .creator(new PhoneNumber(twiliocontactnumberref), // to
                        new PhoneNumber(TWILIO_NUMBER), // from
                        twiliomessageBody)
                .create();*/
        }

}
