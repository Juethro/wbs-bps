<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class reviewer_notification extends Mailable
{
    use Queueable, SerializesModels;
    public $kode;
    public $subject;
    public $tujuan;
    public $konten;

    /**
     * Create a new message instance.
     */
    public function __construct($kode, $subject, $tujuan, $konten)
    {
        $this->kode = $kode;
        $this->subject = $subject;
        $this->tujuan = $tujuan;
        $this->konten = $konten;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            to: $this->tujuan,
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            html: 'reviewerMail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
