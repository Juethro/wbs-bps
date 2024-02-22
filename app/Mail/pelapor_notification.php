<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class pelapor_notification extends Mailable
{
    use Queueable, SerializesModels;
    public $kode;
    public $tanggal;
    public $subject;
    public $tujuan;
    public $konten;

    /**
     * Create a new message instance.
     */
    public function __construct($kode, $tanggal, $subject, $tujuan, $konten)
    {
        $this->kode = $kode;
        $this->subject = $subject;
        $this->tanggal = $tanggal;
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
            html: 'pelaporMail',
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
