<?php

namespace App\Jobs;

use Brevo\Brevo;
use Brevo\TransactionalEmails\Requests\SendTransacEmailRequest;
use Brevo\TransactionalEmails\Types\SendTransacEmailRequestSender;
use Brevo\TransactionalEmails\Types\SendTransacEmailRequestToItem;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendMail implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected string $receiverEmail,
        protected string $receiverName
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $client = new Brevo(apiKey: config('services.brevo.key'));

        $client->transactionalEmails->sendTransacEmail(
            new SendTransacEmailRequest([
                'subject' => 'Hello from Brevo!',
                'htmlContent' => '<html><body><p>Hello,</p><p>This is my first transactional email.</p></body></html>',
                'sender' => new SendTransacEmailRequestSender([
                    'name' => 'Mamorulist ',
                    'email' => 'no-reply@mamorulist.com',
                ]),
                'to' => [
                    new SendTransacEmailRequestToItem([
                        'email' => 'johndoe@example.com',
                        'name' => 'John Doe',
                    ]),
                ],
            ])
        );
    }
}
