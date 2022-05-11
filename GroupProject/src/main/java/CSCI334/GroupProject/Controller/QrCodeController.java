package CSCI334.GroupProject.Controller;

import java.awt.image.BufferedImage;

import CSCI334.GroupProject.QrCodeGenerator;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/QR")
public class QrCodeController {

    @PostMapping( produces = MediaType.IMAGE_PNG_VALUE)
    public BufferedImage zxingQRCode(@RequestBody String barcode) throws Exception {
        return QrCodeGenerator.generateQRCodeImage(barcode);
    }
}

