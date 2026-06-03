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

    public function __construct(
        protected string $receiverEmail,
        protected string $receiverName,
        protected string $subject,
        protected string $htmlContent
    ) {}

    public function handle(): void
    {
        $client = new Brevo(apiKey: config('services.brevo.key'));

        $client->transactionalEmails->sendTransacEmail(
            new SendTransacEmailRequest([
                'subject' => $this->subject,
                'htmlContent' => $this->htmlContent,
                'sender' => new SendTransacEmailRequestSender([
                    'name' => 'Mamorulist',
                    'email' => 'no-reply@mamorulist.com',
                ]),
                'to' => [
                    new SendTransacEmailRequestToItem([
                        'email' => $this->receiverEmail,
                        'name' => $this->receiverName,
                    ]),
                ],
            ])
        );
    }
}
