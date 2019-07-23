package com.epi.jhipster.web.rest;


import com.epi.jhipster.domain.TicketFiles;
import com.epi.jhipster.domain.User;
import com.epi.jhipster.repository.TicketFilesRepository;
import com.epi.jhipster.repository.TicketRepository;
import com.epi.jhipster.repository.UserRepository;
import com.epi.jhipster.security.SecurityUtils;
import com.epi.jhipster.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FileController {

    private final FileService fileService;

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TicketFilesRepository ticketFilesRepository;
    @Autowired
    private UserRepository userRepository;


    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }


    @RequestMapping(
        headers = "content-type=multipart/form-data",
        method = RequestMethod.POST,
        value = ("/files"))
    public void handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("fileSeq") String fileSeq) throws IOException {

        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        TicketFiles ticketFiles = new TicketFiles();
        ticketFiles.setUser(user);
        ticketFiles.setFile_name(file.getOriginalFilename());
        ticketFiles.setFileSize(file.getSize());
        ticketFiles.setTicket(ticketRepository.findById(Long.parseLong(fileSeq)).get());
        ticketFilesRepository.save(ticketFiles);
        fileService.storeFile(file);
    }
    @RequestMapping(
        value = ("/upload"),
        headers = "content-type=multipart/form-data",
        method = RequestMethod.POST)
    public void uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("dataType") String dataType) {
        System.out.println(file.getOriginalFilename());
        System.out.println(dataType);
    }

    @RequestMapping("/ticket/getFilesByTicketId/{id}")
    public List<TicketFiles> findByTicketId(@PathVariable("id") Long id){
        return ticketFilesRepository.findByTicketId(id);
    }

    @RequestMapping(
        headers = "content-type=multipart/form-data",
        method = RequestMethod.POST,
        value = ("/filesimage"))
    public void handleFileUploadImage(@RequestParam("file") MultipartFile file) throws IOException {

        fileService.storeFile(file);
        User user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get();
        user.setImageUrl(file.getOriginalFilename());
        userRepository.save(user);
    }
}
