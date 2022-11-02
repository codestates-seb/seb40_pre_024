package com.preproject.server.filter;

import com.google.gson.Gson;
import com.preproject.server.exception.AuthException;
import com.preproject.server.exception.ExceptionCode;
import com.preproject.server.response.ErrorResponse;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
/** 필터에서 Exception 발생시 실질적으로 분기하여 처리하는 클래스 **/
public class FilterExceptionResolver {

    private final Gson gson;
    private String contentType = "application/json;charset=UTF-8";
    public void handleException(RuntimeException e,HttpServletResponse response) throws IOException {

        //인증, 인가(권한부여) 관련 에러일 경우만 처리
        if (e instanceof AuthException) {
            System.out.println("캐치 제대로함!");

            AuthException authException = (AuthException) e;
            sendErrorResponse(response,authException.getExceptionCode());

        }
        else {
            System.out.println(e.getMessage());

            //실제 live라면 클라이언트에게 에러 내용을 넘기면 안되지만,
            //현재는 개발 편의상 전달
            response.getWriter().write(e.getMessage());
        }
    }

    private void sendErrorResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        ErrorResponse errorResponse = ErrorResponse.of(exceptionCode);
        String content = gson.toJson(errorResponse);

        response.setContentType(contentType);
        response.setStatus(exceptionCode.getStatus());
        response.getWriter().write(content);
    }
}
